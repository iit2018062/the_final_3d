import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
export default function LoadingModel() {
	const mesh = useRef();
	useFrame(() => {
		mesh.current.rotation.x = mesh.current.rotation.y += 0.02;
	});
	return (
		<mesh position={[0, 3, 0]} ref={mesh} scale={3}>
			<boxBufferGeometry attach="geometry" />
			<meshStandardMaterial color="blue" attachArray="material" />
			<meshStandardMaterial color="green" attachArray="material" />
			<meshStandardMaterial color="red" attachArray="material" />

			<meshStandardMaterial color="blue" attachArray="material" />
			<meshStandardMaterial color="green" attachArray="material" />
			<meshStandardMaterial color="red" attachArray="material" />
		</mesh>
	);
}
