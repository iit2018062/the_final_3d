import {  Typography } from "@material-ui/core";
import React from "react";

export default function NodePopUp1({ nodeData }) {
	return (
		<>
			{" "}
			{nodeData != null && (
				<div
					style={{
						backgroundColor: "rgba(0,0,0,0.2)",
						backdropFilter: "blur(5px)",
						color: "white",
						padding: 10,
					}}
				>
					<Typography>
						Node sourceName : {nodeData.data.sourceName}
					</Typography>
					<Typography>
						Node sourceNameLabel : {nodeData.data.sourceNameLabel}
					</Typography>
					<Typography>
						Node adminStatus : {nodeData.data.adminStatus}
					</Typography>
					<Typography>
						Node protocolList : {nodeData.data.protocolList}
					</Typography>
					<Typography>
						Anomaly Score : {nodeData.data.anomalyScore}
					</Typography>
					<Typography>
					interfaceType : {nodeData.data.interfaceType}
					</Typography>
					
					
					
				</div>
			)}
		</>
	);
}