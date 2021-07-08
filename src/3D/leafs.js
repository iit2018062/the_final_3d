import React from "react";
import CautionModel from "./models/Caution";
import LeafModel from "./models/Leaf";
import TickModel from "./models/Tick";

export default function RenderLeafs({
	leafs,
	focusNodeLevel1,
	setHoverNode,
	selectedNode,
	level3,
}) {
	var counter=0;
	return (
		<group>
			{leafs.map((node) => {
				const score = node.data.anomalyScore;
				const tick = score < 20 && score >= 0;
				const caution = score > 20 && score <= 100;
				counter++;
				if (level3===false &&(
					selectedNode === null ||
					selectedNode.data.nodeName === node.data.nodeName
				)) {
					return (
						<group key={node.data.serial+counter}>
							{caution && (
								<CautionModel position={node.position} />
							)}
							
							<LeafModel
								nodeData={node}
								focusNodeLevel1={focusNodeLevel1}
								setHoverNode={setHoverNode}
								level3 = {level3}
							/>
						</group>
					);
				} else return null;
			})}
		</group>
	);
}
