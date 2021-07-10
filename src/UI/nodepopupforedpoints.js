import {  Typography } from "@material-ui/core";
import React from "react";

export default function NodePopUp3({ nodeData }) {
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
                    anomalyScore : {nodeData.data.anomalyScore}
					</Typography>
					<Typography>
                    mac : {nodeData.data.mac}
					</Typography>
					<Typography>
                    tenant : {nodeData.data.tenant}
					</Typography>
					<Typography>
					ip :{" "}
						{
						//if(nodeData.data.protocolList!==undefined){
						(nodeData.data.ip!==undefined && nodeData.data.ip.map((protocol) => {
							return `${protocol} `;
						}))}
					</Typography>
					
				</div>
			)}
		</>
	);
}