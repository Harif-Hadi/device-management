import { useState } from "react";

import DeviceDetails from "./DeviceDetails";
import classes from "./Device.module.css";

const Device = ({ devices, name, id, onDelete }) => {
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);

  return (
    <div className={classes.device_item_container}>
      <div className={classes.device_item}>
        <h2>{name}</h2>
        <button onClick={() => setShowDeviceDetails(!showDeviceDetails)}>
          {showDeviceDetails ? "Hide" : "Show"} Details
        </button>
      </div>

      {showDeviceDetails && (
        <DeviceDetails device_data={devices} id={id} onDelete={onDelete} />
      )}
    </div>
  );
};

export default Device;
