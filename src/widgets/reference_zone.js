import { useState, useEffect } from "react";
import { Typography, MenuItem, Select } from "@mui/material";
import { width } from "@mui/system";
import skyRainUmbrellaType from "../../src/data/sky_rain_umbrella_type.json";
import anotherSkyRainUmbrellaType from "../../src/data/another_sky_rain_umbrella_type.json";
import { Card, CardContent, CardActions, Button } from "@mui/material";

const ReferenceZone = ({ onSet }) => {
  const [selectedJson, setSelectedJson] = useState(skyRainUmbrellaType);
  const [sky_rain_umbrella_type_data, set_sky_rain_umbrella_type_data] =
    useState({});
  useEffect(() => {
    set_sky_rain_umbrella_type_data(selectedJson);
  }, [selectedJson]);
  const handleJsonChange = (event) => {
    setSelectedJson(event.target.value);
  };
  // セットボタンがクリックされたときの処理
  const handleSetButtonClick = (item) => {
    onSet(item);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Select
        value={selectedJson}
        onChange={handleJsonChange}
        style={{ marginBottom: "20px", width: "300px", height: "40px" }}
      >
        <MenuItem value={skyRainUmbrellaType}>問題解決の型の例</MenuItem>
        <MenuItem value={anotherSkyRainUmbrellaType}>
          別の問題解決の型の例
        </MenuItem>
      </Select>
      {Object.entries(sky_rain_umbrella_type_data).map(
        ([category, items], index) => (
          <div key={index}>
            <Typography variant="h6">{category}</Typography>
            {items.map((item, itemIndex) => (
              <Card
                key={itemIndex}
                style={{ marginBottom: "10px", maxWidth: "300px" }}
              >
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>
                      空:
                    </Typography>
                    <Typography variant="body2">{item.sky}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>
                      雨:
                    </Typography>
                    <Typography variant="body2">{item.rain}</Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>
                      傘:
                    </Typography>
                    <Typography variant="body2">{item.umbrella}</Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleSetButtonClick(item)}
                  >
                    セット
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ReferenceZone;
