import React from "react";
import CautionModel from "./models/Caution";
import LeafModel from "./models/Leaf";
import TickModel from "./models/Tick";
import SpineModel from "./models/Spine";

export default function Renderlevel3({
	level3nodes,
	focusNodeLevel1,
	setHoverNode,
	selectedNode,
	level3,
}) {
	var counter = 0;

	return (
		<group>
			{level3nodes.map((node) => {
				const score = node.data.anomalyScore;
				const tick = score < 20 && score >= 0;
				const caution = score > 20 && score <= 100;
				counter++;
				if (level3 === true) {
					if (
						node.data.nodeRole === "leaf" &&
						(selectedNode == null ||
							selectedNode.data.nodeName === node.data.nodeName)
					) {
						return (
							<group key={counter}>
								{caution && (
									<CautionModel position={node.position} />
								)}
								{tick && <TickModel position={node.position} />}
								<LeafModel
									nodeData={node}
									focusNodeLevel1={focusNodeLevel1}
									setHoverNode={setHoverNode}
								/>
							</group>
						);
					} else if (
						node.data.nodeRole === "spine" &&
						(selectedNode == null ||
							selectedNode.data.nodeName === node.data.nodeName)
					) {
						console.log(node.data.nodeName);
						return (
							<group key={counter}>
								{tick && <TickModel position={node.position} />}
								{caution && (
									<CautionModel position={node.position} />
								)}
								<SpineModel
									setHoverNode={setHoverNode}
									nodeData={node}
									focusNodeLevel1={focusNodeLevel1}
								/>
							</group>
						);
					}
				} else return null;
			})}
		</group>
	);
}
