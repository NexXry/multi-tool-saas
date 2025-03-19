import { NextResponse } from "next/server";
import { WebcastPushConnection } from "tiktok-live-connector";

const connections = {};
const messageBuffers = {};
const giftBuffers = {};
const statsData = {}; // Stats storage

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const action = searchParams.get("action") || "status";

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  // Helper function to create connection
  async function createConnection(user) {
    if (!statsData[user]) {
      statsData[user] = { viewerCount: 0, likeCount: 0, followCount: 0 };
    }

    if (!messageBuffers[user]) {
      messageBuffers[user] = [];
    }

    if (!giftBuffers[user]) {
      giftBuffers[user] = [];
    }

    // Create a new connection if it doesn't exist
    if (!connections[user]) {
      connections[user] = new WebcastPushConnection(user);

      // Set up event listeners
      connections[user].on("chat", (data) => {
        messageBuffers[user].push({
          uniqueId: data.uniqueId,
          userId: data.userId,
          comment: data.comment,
          timestamp: new Date().toISOString(),
        });

        if (messageBuffers[user].length > 100) {
          messageBuffers[user].shift();
        }
      });

      connections[user].on("gift", (data) => {
        giftBuffers[user].push({
          uniqueId: data.uniqueId,
          userId: data.userId,
          giftId: data.giftId,
          giftName: data.giftName || "Unknown Gift",
          diamondCount: data.diamondCount || 0,
          timestamp: new Date().toISOString(),
        });

        if (giftBuffers[user].length > 100) {
          giftBuffers[user].shift();
        }
      });

      connections[user].on("roomUser", (data) => {
        statsData[user] = {
          viewerCount: data.viewerCount || 0,
          likeCount: data.likeCount || 0,
          followCount: data.followCount || 0,
          lastUpdate: new Date().toISOString(),
        };
      });

      // Connect to TikTok
      const state = await connections[user].connect();

      return state;
    }

    return null; // Connection already exists
  }

  // For initial connection
  if (action === "connect") {
    try {
      if (connections[username]) {
        await connections[username].disconnect();
        delete connections[username];
      }

      const state = await createConnection(username);

      return NextResponse.json({
        success: true,
        isConnected: true,
        roomId: state.roomId,
        streamerId: state.streamerId,
        messages: messageBuffers[username],
        gifts: giftBuffers[username],
        stats: statsData[username],
      });
    } catch (error) {
      console.error("TikTok connection error:", error);
      return NextResponse.json(
        {
          error: error.message,
          details: "Failed to connect to TikTok Live stream",
        },
        { status: 500 }
      );
    }
  }

  if (action === "status") {
    try {
      // Create connection if it doesn't exist
      if (!connections[username]) {
        try {
          await createConnection(username);
        } catch (error) {
          console.error(`Failed to create connection for ${username}:`, error);
          // Continue even if connection fails, to return existing data
        }
      }

      return NextResponse.json({
        isConnected: !!connections[username],
        messages: messageBuffers[username] || [],
        gifts: giftBuffers[username] || [],
        stats: statsData[username] || {},
      });
    } catch (error) {
      console.error("TikTok status error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  if (action === "statistic") {
    try {
      // Create connection if it doesn't exist
      if (!connections[username]) {
        try {
          await createConnection(username);
        } catch (error) {
          console.error(
            `Failed to create connection for ${username} in statistic action:`,
            error
          );
          return NextResponse.json(
            {
              error: "Failed to connect to TikTok Live stream",
              details: error.message,
            },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({
        stats: statsData[username] || {},
        isConnected: !!connections[username],
      });
    } catch (error) {
      console.error("TikTok statistics error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  // For disconnection
  if (action === "disconnect") {
    if (!connections[username]) {
      return NextResponse.json({ success: false, message: "Not connected" });
    }

    try {
      await connections[username].disconnect();

      // Clean up
      delete connections[username];
      delete messageBuffers[username];
      delete giftBuffers[username];
      delete statsData[username];

      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
