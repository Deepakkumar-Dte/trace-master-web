import { css } from "styled-components";

export const conStyle = css<{ selected?: boolean }>`
  stroke: green;
`;

export const styles = css<{ selected?: boolean }>`
background: white;
border: 2px solid green;
border-radius: 10px;
min-height: 140px;
height: auto !important;
cursor: pointer;
box-sizing: border-box;
padding-bottom: 6px;
position: relative;
user-select: none;
}
.title {
  color: black;
  font-family: sans-serif;
  font-size: 18px;
  padding: 8px;
}
.output {
  text-align: right;
  display:flex;
  justify-content: space-between;
}
.input {
  text-align: left;
  display:flex;
  justify-content: space-between;
}
.output-socket {
  text-align: right;
  align-items: center;
  display: flex;
  color: green;
  margin-right:5px;
}
.output-socket.socket{
  background: blue;
}
.input-socket {
  display: flex;
  align-items: center;
  text-align: left;
  display: flex;
  margin-left: -1px;
}
.input-title,
.output-title {
  vertical-align: middle;
  color: white;
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
}
.input-control {
  z-index: 1;
  vertical-align: middle;
  display: inline-block;
}
.control {
  display: block;
}
.output-title{
  color: green;
  margin-left:45%
}
.input-title{
  color: green;
  margin-right:45%
}
`;
