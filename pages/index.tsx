import { ResponsiveBar, Serie } from "@nivo/bar";
import type { NextPage } from "next";
import { useEffect, useState } from "react";


const Home: NextPage = () => {
  const [state, setState] = useState<any[]>([]);
  useEffect(() => {
    const a = new WebSocket("ws://127.0.0.1:7731");
    a.addEventListener("message", (e) => {
      const [data, camera]=e.data.split("|")
      setState((prev:any[])=>{
        const temp:any[]=[...prev]
        temp[camera.split(":")[1]]={label:camera,...JSON.parse(data)}
        return temp
      });
    });
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <div style={{ height: "400px" }}>
        <ResponsiveBar
          data={state??[{}]}
          keys={["car", "person", "truck", "bus"]}
          indexBy="label"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueFormat=">-.2f"
          layout="horizontal"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
