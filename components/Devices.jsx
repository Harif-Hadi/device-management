import { useContext, useEffect, useState } from "react";
import Device from "./Device";
import classes from "./Devices.module.css";
import NotificationContext from "../store/notification-context";

const Devices = () => {
  const notificationCtx = useContext(NotificationContext);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    notificationCtx.showNotification({
      title: "Loading...",
      message: "Loading device data",
      status: "pending",
    });
    fetch("/api/device")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data.devices);
        notificationCtx.showNotification({
          title: "Success!",
          status: "success",
          message: "Successfully loaded device data",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          status: "error",
          message: "Failed to load data",
        });
      });
  }, []);

  const deleteHandler = (id) => {
    fetch(`/api/device`, {
      method: "DELETE",
      body: id,
    })
      .then((response) => response.json())
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully deleted device",
          status: "success",
        })
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Failed to delete device",
          status: "error",
        });
      });

    const newDevices = () => {
      const deletedDevices = devices.filter((device) => device._id !== id);
      return deletedDevices;
    };
    setDevices(newDevices);
  };

  const editHandler = (deviceInfo) => {
    fetch("/api/device", {
      method: "PATCH",
      body: JSON.stringify(deviceInfo),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully updated device",
          status: "success",
        })
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Failed to update device",
          status: "error",
        });
      });
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
              onEdit={editHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Devices;
