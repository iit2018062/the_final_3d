
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({node,
	setHoverNode1, 
	focusNodeLevel2,}) {
  const group = useRef()
  const { nodes, materials } = useGLTF(process.env.PUBLIC_URL  + '/3DModels/interface.glb')
  return (
    <group
			ref={group}
			position={node.position}
			onClick={() => {
				focusNodeLevel2(node);
			}}
			onPointerOver={() => setHoverNode1(node)}
			onPointerLeave={() => setHoverNode1(null)}
      scale={[0.19/2, 1/2, 1.56/2]}
		>
      {/* <RenderAnnotations name={node.data.sourceNameLabel} /> */}
      {/* <group position={[0, 1.77, 0]} scale={[0.19, 1, 1.56]}> */}
        <mesh geometry={nodes.Cube001.geometry} material={materials['Material.002']} />
        <mesh geometry={nodes.Cube001_1.geometry} material={materials['Material.001']} />
      </group>
    // </group>
  )
}

useGLTF.preload(process.env.PUBLIC_URL  + '/3DModels/interface.glb')
