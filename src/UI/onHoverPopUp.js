import { Paper, Typography } from "@material-ui/core";
import React from "react";

export default function NodePopUp({ nodeData }) {
	return (
		<>
			{" "}
			{nodeData != null && (
				<Paper
					style={{
						backgroundColor: "rgba(0,0,0,0.3)",
						color: "white",
						padding: 10,
					}}
				>
					<Typography>
						 Name : {nodeData.data.nodeName}
					</Typography>
					<Typography>
						Anomaly Score : {nodeData.data.anomalyScore}
					</Typography>
					<Typography>
						 Role : {nodeData.data.nodeRole}
					</Typography>
					<Typography>
						 serial : {nodeData.data.serial}
					</Typography>
					<Typography>
						 version : {nodeData.data.version}
					</Typography>
					<Typography>
						 model : {nodeData.data.model}
					</Typography>
				</Paper>
			)}
		</>
	);
}
