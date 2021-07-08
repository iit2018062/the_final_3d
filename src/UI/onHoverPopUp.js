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
						Node Name : {nodeData.data.nodeName}
					</Typography>
					<Typography>
						Anomaly Score : {nodeData.data.anomalyScore}
					</Typography>
					<Typography>
						Node Role : {nodeData.data.nodeRole}
					</Typography>
					<Typography>
						Node serial : {nodeData.data.serial}
					</Typography>
					<Typography>
						Node version : {nodeData.data.version}
					</Typography>
					<Typography>
						Node model : {nodeData.data.model}
					</Typography>
				</Paper>
			)}
		</>
	);
}
