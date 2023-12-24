import { useContext, useEffect, useState } from "react";
import Device from "./Device";
import classes from "./Devices.module.css";
import NotificationContext from "../store/notification-context";
import { deleteDevices, editDevices, fetchDeviceData } from "../hooks/api-util";

const Devices = () => {
  const notificationCtx = useContext(NotificationContext);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      notificationCtx.showNotification({
        title: "Loading...",
        message: "Loading device data",
        status: "pending",
      });

      try {
        const data = await fetchDeviceData();
        console.log(data);
        setDevices(data.devices);
        notificationCtx.showNotification({
          title: "Success!",
          status: "success",
          message: "Successfully loaded device data",
        });
      } catch (error) {
        notificationCtx.showNotification({
          title: "Error!",
          status: "error",
          message: "Failed to load data",
        });
      }
    };
    fetch();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await deleteDevices(id);
      notificationCtx.showNotification({
        title: "Success!",
        status: "success",
        message: "Successfully deleted device ",
      });
      const newDevices = () => {
        const deletedDevices = devices.filter((device) => device._id !== id);
        return deletedDevices;
      };
      setDevices(newDevices);
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        status: "error",
        message: "Failed to delete data",
      });
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
