import { useContext, useState } from "react";
import classes from "./DeviceDetails.module.css";
import Input from "./Input";
import NotificationContext from "../store/notification-context";
import { editDevices } from "../helper/api-util";

const DeviceDetails = ({ device_data, onDelete, id }) => {
  const notificationCtx = useContext(NotificationContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [enteredName, setEnteredName] = useState("");
  const [enteredOwnerName, setEnteredOwnerName] = useState("");
  const [enteredBatteryStatus, setEnteredBatteryStatus] = useState("");
  const [enteredDeviceType, setEnteredDeviceType] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredOwnerName.trim() === "" ||
      enteredBatteryStatus < 10 ||
      enteredDeviceType.trim() === ""
    ) {
      alert("Invalid");
    } else {
      const deviceInfo = {
        id,
        device_name: enteredName,
        owner: enteredOwnerName,
        battery_status: enteredBatteryStatus,
        device_type: enteredDeviceType,
      };

      editHandler(deviceInfo);
      setEnteredName("");
      setEnteredBatteryStatus("");
      setEnteredDeviceType("");
      setEnteredOwnerName("");
    }
  };

  const editHandler = async (deviceInfo) => {
    try {
      await editDevices(deviceInfo);
      notificationHandler("success", notificationCtx);

      window.location.reload(true);
    } catch (error) {
      notificationHandler("error", notificationCtx);
    }
  };

  return (
    <div className={classes.device_details}>
      <h3>Device Name: {device_data.device_name}</h3>
      <p>Owner: {device_data.owner}</p>
      <p>Device Type: {device_data.device_type}</p>
      <p>Battery Status: {device_data.battery_status}</p>
      <div className={classes.device_details_actions}>
        <button
          style={{ marginRight: "0.8rem" }}
          onClick={() => {
            setToggleEdit(!toggleEdit);
          }}
        >
          {toggleEdit ? "Cancel" : "Edit"}
        </button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      {toggleEdit && (
        <form className={classes.toggle_edit_form} onSubmit={submitHandler}>
          <Input
            htmlFor="device-name"
            title="Deivce Name"
            inputType="text"
            value={enteredName}
            onChange={(event) => setEnteredName(event.target.value)}
          />

          <Input
            htmlFor="owner-name"
            title="Owner Name"
            inputType="text"
            value={enteredOwnerName}
            onChange={(event) => setEnteredOwnerName(event.target.value)}
          />
          <Input
            htmlFor="battery_status"
            title="Battery Status"
            inputType="number"
            value={enteredBatteryStatus}
            onChange={(event) => setEnteredBatteryStatus(event.target.value)}
          />

          <Input
            htmlFor="device-type"
            title="Device Type"
            inputType="text"
            value={enteredDeviceType}
            onChange={(event) => setEnteredDeviceType(event.target.value)}
          />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
};

export default DeviceDetails;
