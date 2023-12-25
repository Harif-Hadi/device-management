import { useContext, useEffect, useState } from "react";
import Device from "./Device";
import classes from "./Devices.module.css";
import NotificationContext from "../store/notification-context";
import {
  deleteDevices,
  fetchDeviceData,
  notificationHandler,
} from "../helper/api-util";

const Devices = () => {
  const notificationCtx = useContext(NotificationContext);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      notificationHandler("pending", notificationCtx);

      try {
        const data = await fetchDeviceData();
        console.log(data);
        setDevices(data.devices);
        notificationHandler("success", notificationCtx);
      } catch (error) {
        notificationHandler("error", notificationCtx);
      }
    };
    fetch();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteDevices(id);
      notificationHandler("success", notificationCtx);
      const newDevices = () => {
        const deletedDevices = devices.filter((device) => device._id !== id);
        return deletedDevices;
      };
      setDevices(newDevices);
    } catch (error) {
      notificationHandler("error", notificationCtx);
    }
  };

  return (
    <div className={classes.devices_container}>
      {devices.length === 0 ? (
        <h3 style={{ textAlign: "center", fontWeight: 400 }}>
          No Devices Found
        </h3>
      ) : (
        <div>
          {devices.map((data, index) => (
            <Device
              key={index}
              id={data._id}
              devices={data}
              name={data.device_name}
              onDelete={deleteHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Devices;
