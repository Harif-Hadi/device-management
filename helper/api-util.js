export async function fetchDeviceData() {
  const response = await fetch("/api/device");
  const data = await response.json();

  return data;
}

export async function sendDeviceData(deviceInfo) {
  const response = await fetch("/api/device", {
    method: "PUT",
    body: JSON.stringify(deviceInfo),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!!");
  }
}

export async function deleteDevices(id) {
  const response = await fetch("/api/device", {
    method: "DELETE",
    body: id,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!!");
  }
}

export async function editDevices(deviceInfo) {
  const response = await fetch("/api/device", {
    method: "PATCH",
    body: JSON.stringify(deviceInfo),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!!");
  }
}

export const notificationHandler = (status, notificationCtx) => {
  if (status === "pending") {
    notificationCtx.showNotification({
      title: "Loading...",
      message: "Loading device data",
      status: "pending",
    });
  }

  if (status === "success") {
    notificationCtx.showNotification({
      title: "Success!",
      status: "success",
      message: "Successfully loaded device data",
    });
  }

  if (status === "error") {
    notificationCtx.showNotification({
      title: "Error!",
      status: "error",
      message: "Failed to load data",
    });
  }
};
