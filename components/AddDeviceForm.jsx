import { useContext, useRef } from "react";
import classes from "./AddDeviceForm.module.css";
import Input from "./Input";
import NotificationContext from "../store/notification-context";

const AddDeviceForm = ({ onAdd, hideDeviceForm }) => {
  const notificationCtx = useContext(NotificationContext);

  const deviceNameInputRef = useRef();
  const ownerNameInputRef = useRef();
  const batteryStatusInputRef = useRef();
  const deviceTypeInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredDeviceName = deviceNameInputRef.current.value;
    const enteredOwnerName = ownerNameInputRef.current.value;
    const enteredBatteryStatus = batteryStatusInputRef.current.value;
    const enteredDeviceType = deviceTypeInputRef.current.value;

    if (
      enteredDeviceName.trim() === "" ||
      enteredOwnerName.trim() === "" ||
      enteredBatteryStatus < 10 ||
      enteredBatteryStatus > 100 ||
      enteredDeviceType.trim() === ""
    ) {
      alert("Invalid");
    } else {
      const deviceInfo = {
        device_name: enteredDeviceName,
        owner: enteredOwnerName,
        battery_status: enteredBatteryStatus,
        device_type: enteredDeviceType,
      };

      fetch("/api/device", {
        method: "PUT",
        body: JSON.stringify(deviceInfo),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          notificationCtx.showNotification({
            title: "Success",
            message: "Successfully sent device data",
            status: "success",
          });
          window.location.reload(true);
        })
        .catch((error) => {
          notificationCtx.showNotification({
            status: "error",
            title: "Error!",
            message: "Failed to send data",
          });
        });

      deviceNameInputRef.current.value = "";
      ownerNameInputRef.current.value = "";
      batteryStatusInputRef.current.value = "";
      deviceTypeInputRef.current.value = "";
    }
  };

  return (
    <form className={classes.controls} onSubmit={submitHandler}>
      <Input
        htmlFor="device-name"
        title="Deivce Name"
        inputType="text"
        inputRef={deviceNameInputRef}
      />

      <Input
        htmlFor="owner-name"
        title="Owner Name"
        inputType="text"
        inputRef={ownerNameInputRef}
      />
      <Input
        htmlFor="battery_status"
        title="Battery Status"
        inputType="number"
        inputRef={batteryStatusInputRef}
      />

      <Input
        htmlFor="device-type"
        title="Device Type"
        inputType="text"
        inputRef={deviceTypeInputRef}
      />

      <div className={classes.form_actions}>
        <button type="submit" className={classes.submit_btn}>
          Submit
        </button>
        <button className={classes.cancel_btn} onClick={hideDeviceForm}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddDeviceForm;
