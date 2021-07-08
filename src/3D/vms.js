import React from "react";
import VMModel from "./models/VM";
export default function RenderVms({ vms,level3,setHoverNode2 }) {
	var counter = 0;
	return (
		<>
			{vms !== undefined && vms.map((node) => {
				counter++;
				return <VMModel node={node} key={counter} 
				setHoverNode2 = {setHoverNode2}/>;
			})}
		</>
	);
}
