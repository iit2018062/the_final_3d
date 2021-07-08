import React from "react";
import CautionModel from "./models/Caution";
import SpineModel from "./models/Spine";
import TickModel from "./models/Tick";

export default function RenderSpines({
	spines,
	focusNodeLevel1,
	setHoverNode,
	selectedNode,
	level3,
}) {
	return (
		<group>
			{spines.map((node) => {
				const score = node.data.anomalyScore;
				const tick = score < 20 && score >= 0;
				const caution = score > 20 && score <= 100;
				if (
					level3 === false &&
					(selectedNode === null ||
						selectedNode.data.nodeName === node.data.nodeName ||
						(selectedNode.data.fabricLinks !== undefined &&
							selectedNode.data.fabricLinks.find((obj) => {
								if (obj.neighbourNode === node.data.nodeName)
									return true;
								return false;
							})))
				) {
					return (
						<group key={node.data.serial}>
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
				} else return null;
			})}
		</group>
	);
}
