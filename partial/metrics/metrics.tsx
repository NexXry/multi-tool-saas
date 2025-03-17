"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Weight from "@/partial/metrics/tabs/weight";
import Speed from "@/partial/metrics/tabs/speed";
import Distance from "@/partial/metrics/tabs/distance";
import Temperature from "@/partial/metrics/tabs/temperature";
import Money from "@/partial/metrics/tabs/money";

export default function Metrics() {
  return (
    <>
      <h1 className="text-center text-2xl font-bold">
        Metrics: convert weight, speed, distance, temperature, money
      </h1>
      <div className="flex items-center justify-center">
        <Tabs defaultValue="weight">
          <TabsList className="w-[400px]">
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="money">Money</TabsTrigger>
          </TabsList>
          <TabsContent value="weight">
            <Weight />
          </TabsContent>
          <TabsContent value="speed">
            <Speed />
          </TabsContent>
          <TabsContent value="distance">
            <Distance />
          </TabsContent>
          <TabsContent value="temperature">
            <Temperature />
          </TabsContent>
          <TabsContent value="money">
            <Money />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
