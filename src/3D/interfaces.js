import React from "react";

import Model from "./models/Interface";

export default function RenderInterfaces({
	interfaces,
	level3,
	setHoverNode1,
	focusNodeLevel2,
	selectedNode,
}) {
	// useEffect(() => {
	//console.log(interfaces);
	// }, [interfaces]);
	var counter = 1;

	return (
		<>
			{selectedNode !== null &&
				interfaces !== undefined &&
				interfaces.map((node) => {
					counter++;
					return (
						<group
							key={
								selectedNode.data.nodeName +
								node.data.sourceName +
								counter
							}
						>
							<Model
								node={node}
								setHoverNode1={setHoverNode1}
								focusNodeLevel2={focusNodeLevel2}
							/>
						</group>
					);
				})}
		</>
	);
}
