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
					Interface sourceName : {nodeData.data.sourceName}
					</Typography>
					<Typography>
					Interface sourceNameLabel : {nodeData.data.sourceNameLabel}
					</Typography>
					<Typography>
					Interface adminStatus : {nodeData.data.adminStatus}
					</Typography>
					<Typography>
						 protocolList :{" "}
						{nodeData.data.protocolList.map((protocol) => {
							return `${protocol} `;
						})}
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