import React, { useRef } from "react";
import RenderAnnotations from "./Annotaions";

	export default function EndpointModel({ node,setHoverNode3 }) {
		const group = useRef();
		//console.log(node);
		return (
			<group
				ref={group}
				position={node.position}
	
				onPointerOver={() => setHoverNode3(node)}
				onPointerLeave={() => setHoverNode3(null)}
			>
				<RenderAnnotations name={node.data.tenant} />
			<mesh  dispose={null}>
				<sphereBufferGeometry attach="geometry" args={[0.5, 15, 15]} />
				<meshStandardMaterial attach="material" color="red" />
			</mesh>
			</group>
		);
	}
	
		