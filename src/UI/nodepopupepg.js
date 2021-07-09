import {  Typography } from "@material-ui/core";
import React from "react";

export default function NodePopUp2({ nodeData }) {
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
                    epg : {nodeData.data.epg}
					</Typography>
					<Typography>
                    tenant : {nodeData.data.tenant}
					</Typography>
					<Typography>
                    vmName : {nodeData.vmName}
					</Typography>
				</div>
			)}
		</>
	);
}