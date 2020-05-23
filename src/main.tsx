import React from "react";
import { render as reactDomRender } from "react-dom";
import { App } from "./App";

const mountElement = document.getElementById("root");

function render(): void {
  reactDomRender(<App />, mountElement);
}

export function main() {
  render();
}
