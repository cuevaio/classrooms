"use client";

import React from "react";

export const DynamicForFreeClassrooms = () => {
  React.useEffect(() => {
    let now = new Date();
    let limaDateTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      timeZone: "America/Lima",
    });

    let item_trigger = document.querySelector(
      `[data-item="${limaDateTime}"]`
    ) as HTMLButtonElement;

    item_trigger?.click();
  }, []);

  return null;
};
