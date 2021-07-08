import React, { useRef } from "react";

	export default function EndpointModel({ node,setHoverNode3 }) {
		const group = useRef();
		return (
			<group
				ref={group}
				position={node.position}
	
				onPointerOver={() => setHoverNode3(node)}
				onPointerLeave={() => setHoverNode3(null)}
			>
			<mesh  dispose={null}>
				<sphereBufferGeometry attach="geometry" args={[0.5, 15, 15]} />
				<meshStandardMaterial attach="material" color="red" />
			</mesh>
			</group>
		);
	}
	
		