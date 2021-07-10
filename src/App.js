import { Grid, jssPreset } from "@material-ui/core";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Main3DComp from "./3D";
import SideBarComp from "./UI/sideBar";
import StatusBarComp from "./UI/statusBar";
import NodePopUp1 from "./UI/nodePopUp";
import NodePopUp3 from "./UI/nodepopupforedpoints";
import NodePopUp2 from "./UI/nodepopupepg";

import * as THREE from "three";
import axios from "axios";
import NodePopUp from "./UI/onHoverPopUp";

function App() {
	//messages for the status bar
	const [statusMsg, setStatusMsg] = useState("initializing...");
	const [errorMsg, setErrorMsg] = useState(null);

	//variables for camera movement
	const [targetPosition, setTargetPosition] = useState(null);
	const [targetLookAt, setTargetLookAt] = useState(null);
	const [defaultCameraLoc, setDefaultCameraLoc] = useState([10, 10, 10]);
	const [defaultCameraLookAt, setDefaultCameraLookAt] = useState([0, 0, 0]);

	//node data
	const [leafs, setLeafs] = useState([]);
	const [spines, setSpines] = useState([]);
	const [links, setLinks] = useState([]);
	const [hoverNode, setHoverNode] = useState(null);
	const [selectedNode, setSelectedNode] = useState(null);

	//interfaces
	const [interfaces, setInterfaces] = useState([]);
	const [interfaceLink, setInterfaceLink] = useState([]);
	const [endpoints, setEndpoints] = useState([]);
	const [epg, setEpg] = useState([]);
	const [hoverNode1, setHoverNode1] = useState(null);
	const [isinterface, setisinterface] = useState(false);
	const [hoverNode2, setHoverNode2] = useState(null);
	const [hoverNode3, setHoverNode3] = useState(null);
	//leve3
	const [level3details, setlevel3details] = useState([]);
	const [level3nodes, setlevel3nodes] = useState([]);
	const [level3leaf, setlevel3leaf] = useState([]);
	const [level3spine, setlevel3spine] = useState([]);
	//level2
	const [level2spine,setlevel2spine] = useState([]);

	const [level3, setlevel3] = useState(false);
	function focusNodeLevel2(nodeData) {
		const nodeLoc = new THREE.Vector3(
			nodeData.position[0],
			nodeData.position[1],
			nodeData.position[2]
		);

		const cameraLoc = new THREE.Vector3();
		cameraLoc.addVectors(nodeLoc, new THREE.Vector3(5, 5, 5));
		setTargetPosition(cameraLoc);

		setTargetLookAt([
			nodeData.position[0],
			nodeData.position[1] + 1,
			nodeData.position[2],
		]);
	}

	function level3call(epg) {
		setInterfaces([]);
		setInterfaceLink([]);
		setEndpoints([]);
		setEpg([]);
		//    alert("hello");
		setlevel3(true);
		fetchlevel3(epg);
	}
function fetchlevel3(epg) {
	setlevel2spine([]);
		resetCamera();
		axios({
			url: "https://172.31.165.136:31782/api/telemetry/topology/search.json?filter="+epg,
			method: "GET",
			Headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => {
				setStatusMsg("data successfully fetched!");
				var array = response.data.data;
				//console.log(array);
				if(response.data.data.length===0)
				alert("could not find the result!")
				var varnode = [];
				var epgdetails = [];
				var spine = [];
				var leaf = [];
				//var newDefaultLoc = [0, 0, 0];
				var counter = 0;
				var newInterfaces = [];
				var newInterfaceLinks = [];
				var newEndpoints = [];
				var newVms = [];
				var newLeafs = [];
				var maxNodesInLevel = 14;
				var nodesLeft = array.length;
				var theta, radius=4, maxRadius, myObj, x, z;
				var y = 5;
				//var counter = 0;
				setisinterface(true);
				for (var i in array) {
					//console.log(array[i]);
					theta =(2 * Math.PI) / Math.min(maxNodesInLevel, nodesLeft);
					radius = maxNodesInLevel;

					x = radius * Math.cos(theta * i);
					z = radius * Math.sin(theta * i);

					myObj = {
						data: array[i],
						position: [x, y, z],
					};
					varnode.push(myObj);
					counter += 1;

					if (counter === maxNodesInLevel) {
						maxRadius = radius;
						nodesLeft -= maxNodesInLevel;
						counter = 0;
						maxNodesInLevel += 5;
						y += 5; //distance added every level
					}

					const tempCombined = [...leafs, ...spines];
					const nodeIndex = tempCombined
						.map((node) => node.data.nodeName)
						.indexOf(array[i].nodeName);
					if (nodeIndex >= 0 && nodeIndex < tempCombined.length) {
						//varnode.push(tempCombined[nodeIndex]);
						//counter++;
						// newDefaultLoc[0] += tempCombined[nodeIndex].position[0];
						// newDefaultLoc[1] += tempCombined[nodeIndex].position[1];
						// newDefaultLoc[2] += tempCombined[nodeIndex].position[2];
						if (tempCombined[nodeIndex].data.nodeRole === "spine") {
							spine.push(tempCombined[nodeIndex]);
						} else if (
							tempCombined[nodeIndex].data.nodeRole === "leaf"
						) {
							leaf.push(tempCombined[nodeIndex]);
						}

						const endObj = {
							data: tempCombined[nodeIndex],
							interfaces: array[i].interface,
						};

						epgdetails.push(endObj);
					}
					
					
				var input = array[i].interface;
				if(input!==undefined){
				
				var maxNodesInLevel1 = 20;
				var nodesLeft1 = input.length;
				// //distributing in circle

				var radius1, theta1;
				var counter1 = 0;
				// var y = nodeData.position[1] + 5;
				var y1 = 4;
				var count = 0;
				for (let j in input) {
					count++;
					theta1 =(2 * Math.PI) / Math.min(maxNodesInLevel1, nodesLeft1);
					radius1 = maxNodesInLevel1 / 2;
					const x1 =myObj.position[0] + radius1 * Math.cos(theta1 * j);
					const z1 =myObj.position[2] + radius1 * Math.sin(theta1 * j);
					const myObj1 = {
						data: input[j],
						position: [x1, y1, z1],
					};
					newInterfaceLinks.push({
						src: myObj.position,
						target: [x1, y1, z1],
						id: `${input[j].sourceName}${count}${tempCombined[nodeIndex].data.nodeName}`,
					});
					newInterfaces.push(myObj1);
					//endpoints
					if (input[j].endpoints !== undefined) {
						const endObj = {
							data: input[j].endpoints[0],
							vmName: input[j].vmName,
							position: [x1, y1 + 6, z1],
						};
						newEndpoints.push(endObj);
						newInterfaceLinks.push({
							color: "red",
							src: [x1, y1, z1],
							target: [x1, y1 + 6, z1],
							id: `${input[j].endpoints[0].epg}${count}${tempCombined[nodeIndex].data.nodeName}`,
						});
						//vms
						if (input[j].endpoints[0].vmName !== undefined) {
							//console.log(epg);
							const vmObj = {
								data: input[j].endpoints[0].epg,
								vmName: input[j].endpoints[0].vmName,
								position: [x1, y1 + 9, z1],
							};
							newVms.push(vmObj);
							newInterfaceLinks.push({
								color: "green",
								src: [x1, y1 + 6, z1],
								target: [x1, y1 + 9, z1],
								id: `${input[j].endpoints[0].epg}${count}${tempCombined[nodeIndex].data.nodeName}`,
							});
						}
					}

					counter1 += 1;
					if (counter1 === maxNodesInLevel1) {
						nodesLeft1 -= maxNodesInLevel1;
						counter1 = 0;
						maxNodesInLevel1 += 5;
						y1 += 2; //distance added every level
					}
				}
			}
		
	}
		setInterfaces(newInterfaces);
		setInterfaceLink(newInterfaceLinks);
		setEndpoints(newEndpoints);
		setEpg(newVms);
				
				// newDefaultLoc[0] /= counter;
				// newDefaultLoc[1] = 10;
				// newDefaultLoc[2] /= counter;
				//console.log(newDefaultLoc);
				//set default location

				setlevel3details(epgdetails);
				setlevel3nodes(varnode);
				setlevel3spine(spine);
				setlevel3leaf(leaf);

				// setDefaultCameraLookAt(newDefaultLoc);
				// counter *= 3; //distance of camera from central point
				// setDefaultCameraLoc([
				// 	newDefaultLoc[0] + counter,
				// 	newDefaultLoc[1] + counter,
				// 	newDefaultLoc[2] + counter,
				// ]);
				
			})
			.catch((error) => {
				setErrorMsg("no data for the given search pressure reload level one!");
				console.error(error);
			});
	}
	// useEffect(() => {
	// 	resetCamera();
	// 	console.log({defaultCameraLoc, defaultCameraLookAt})
	// }, [defaultCameraLoc, defaultCameraLookAt])

	function focusNodeLevel1(nodeData) {
		if (nodeData === undefined) return;
		if(level3===true)
		{resetCamera();return;}
		setInterfaces([]);
		setInterfaceLink([]);
		setlevel2spine([]);
		fetchData2(nodeData);
		

		//some maths to get the new position vector of camera
		const nodeLoc = new THREE.Vector3(
			nodeData.position[0],
			nodeData.position[1],
			nodeData.position[2]
		);

		const cameraLoc = new THREE.Vector3();
		cameraLoc.addVectors(nodeLoc, new THREE.Vector3(20, 20, 20));
		setTargetPosition(cameraLoc);

		setTargetLookAt([
			nodeData.position[0],
			nodeData.position[1],
			nodeData.position[2],
		]);

		//jugaad for error when removing HTML element from dom
		//dont know why but 1ms delay solves the issue
		const myTime = setTimeout(() => {
			setSelectedNode(nodeData);
		}, 200);
		//for clearing the timer
		timeOutRef.current = myTime;

		//i dont know why but this causes lag when clicked on node
		//but not when function called from side bar
		//very strange, could not find anything online
		// setSelectedNode(nodeData);
	}
	function fetchData2(nodeData) {
		//for fetching data for level
		setisinterface(true);
		setlevel2spine([]);
		resetCamera();
		axios({
			url: "https://172.31.165.136:31782/api/telemetry/topology/nodes/details.json?fabricName=DC-WEST&nodeName="+nodeData.data.nodeName,
			method: "GET",
			Headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => {
				setStatusMsg("data successfully fetched!");

				var input = response.data.data[0].interface;
				//console.log(input);

				var newInterfaces = [];
				var newInterfaceLinks = [];
				var newEndpoints = [];
				var newVms = [];
				var maxNodesInLevel = 20;
				if(input!==undefined){
				var nodesLeft = input.length;
				//distributing in circle

				var radius, theta;
				var counter = 0;
				// var y = nodeData.position[1] + 5;
				var y = 2;
				if (nodeData.data.nodeRole === "spine") {
					y = nodeData.position[1];
				}

				for (let i in input) {
					theta =
						(2 * Math.PI) / Math.min(maxNodesInLevel, nodesLeft);
					radius = maxNodesInLevel / 2;
					const x =
						nodeData.position[0] + radius * Math.cos(theta * i);
					const z =
						nodeData.position[2] + radius * Math.sin(theta * i);
					const myObj = {
						data: input[i],
						position: [x, y, z],
					};
					newInterfaceLinks.push({
						src: nodeData.position,
						target: [x, y, z],
						id: `${myObj.data.sourceName}`,
					});
					newInterfaces.push(myObj);
					//endpoints
					var m = 0;
					if (input[i].endpoints !== undefined) {
						m = (2*Math.PI)/(input[i].endpoints.length);
						var radius2 = input[i].endpoints.length/2;
						for(var k in input[i].endpoints){
							const x_cor=x+radius2 * Math.cos(m * k);
							const z_cor =z+radius2 * Math.sin(m * k);
							
						const endObj = {
							data: input[i].endpoints[k],
							position: [x_cor, y + 5, z_cor],
						
						};
						newEndpoints.push(endObj);
					
						newInterfaceLinks.push({
							color: "red",
							src: [x, y, z],
							target: [x_cor, y + 5, z_cor],
							id: `${x}${y}${z}${nodeData.position}${x_cor}${z_cor}${k}`,
						});

						//vms

						if (input[i].endpoints[0].vmName !== undefined) {
							//console.log(epg);
							const vmObj = {
								data: input[i].endpoints[0].epg,
								vmName: input[i].endpoints[0].vmName,
								position: [x, y + 10, z],
							};
							newVms.push(vmObj);
							newInterfaceLinks.push({
								color: "green",
								src: [x_cor, y + 5, z_cor],
								target: [x, y + 10, z],
								id: `${nodeData.data.fabricLinks.neighbourNode}${nodeData.position}${x_cor}${z_cor}`,
							});
						}
					}}

					counter += 1;
					if (counter === maxNodesInLevel) {
						nodesLeft -= maxNodesInLevel;
						counter = 0;
						maxNodesInLevel += 5;
						y += 2; //distance added every level
					}
				}
				//reamining spine links
				var newSpines=[];
				const tempCombined = [...spines, ...leafs];
				if (
					nodeData.data.nodeRole === "leaf" &&
					nodeData.data.fabricLinks !== undefined
				) {
					setlevel2spine([]);
					var r = nodeData.data.fabricLinks.length/2;
					var angle = (2*Math.PI)/(nodeData.data.fabricLinks.length);
					for (let i in nodeData.data.fabricLinks) {
						const node2 =nodeData.data.fabricLinks[i].neighbourNode;

						//find target node
						const targetIndex = tempCombined
							.map((node) => node.data.nodeName)
							.indexOf(node2);
					    var x1 = nodeData.position[0] + r * Math.cos(angle * i);
						var z1 = nodeData.position[2] + radius * Math.sin(angle * i);
						const myobject = {
							data:tempCombined[targetIndex].data,
							position:[x1,tempCombined[targetIndex].position[1]-8,z1],
						};
						newSpines.push(myobject);
						newInterfaceLinks.push({
							src: [x1,tempCombined[targetIndex].position[1]-8,z1],
							target: nodeData.position,
							id: `${nodeData.data.fabricLinks.neighbourNode}${nodeData.position}${tempCombined[targetIndex].position}`,
						});
					}
				setlevel2spine(newSpines);	
				}
			}
				//console.log(newVms);
				setInterfaces(newInterfaces);
				setInterfaceLink(newInterfaceLinks);
				setEndpoints(newEndpoints);
				setEpg(newVms);
				// setDefaultCameraLoc([maxNodesInLevel*1.3, y + 10, maxNodesInLevel*1.3]);
				// setDefaultCameraLookAt([0, y / 2, 0]);
			})
			.catch((error) => {
				setErrorMsg("could not fetch data");
				console.error(error);
			});
	}

	const timeOutRef = useRef();

	useEffect(() => {
		const timeoutId = timeOutRef.current;
		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	function resetCamera() {
		if(level3===false){
		setEndpoints([]);
		setEpg([]);
		setSelectedNode(null);
		setInterfaces([]);
		setInterfaceLink([]);}
		setlevel2spine([]);
		setTargetPosition(new THREE.Vector3(...defaultCameraLoc));
		setTargetLookAt(defaultCameraLookAt);
	}
	function reloadLevel1() {
		setEndpoints([]);
		setEpg([]);
		setlevel3spine([]);
		setlevel3leaf([]);
		setisinterface(false);
		setInterfaces([]);
		setInterfaceLink([]);
		setDefaultCameraLoc([10, 10, 10]);
		setDefaultCameraLookAt([0, 0, 0]);
		setSelectedNode(null);
		setLeafs([]);
		setSpines([]);
		setLinks([]);
		fetchData1();
		setEpg([]);
		setEndpoints([]);
		resetCamera();
		setlevel3(false);
		setlevel3details([]);
		setlevel3nodes([]);
		setHoverNode1(null);
		setlevel2spine([]);
	}
	//fetch level one data
	function fetchData1() {
		setInterfaces([]);
		setInterfaceLink([]);
		setSelectedNode(null);
		//setEndpoints(null);
		//setEpg(null);
		setlevel3spine([]);
		setlevel3leaf([]);
		setEndpoints([]);
		setEpg([]);
		setlevel2spine([]);


		setStatusMsg("fetching data...");
		axios({
			url: "https://172.31.165.136:31782/api/telemetry/topology/nodes.json?startTs=now-5m&endTs=now&fabricName=DC-WEST",
			method: "GET",
			Headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => {
				setStatusMsg("data successfully fetched!");

				//reset old data
				setSpines([]);
				setLeafs([]);
				setLinks([]);

				const tempLeafs = [];
				const tempSpines = [];
                if(response.data.data.length===0)
				alert("could not find the result!")
				//separate spines and leafs
				for (let node in response.data.data) {
					if (response.data.data[node].nodeRole === "leaf") {
						tempLeafs.push(response.data.data[node]);
					} else if (response.data.data[node].nodeRole === "spine") {
						tempSpines.push(response.data.data[node]);
					}
				}

				// Processing this data to assign location to every node

				// leafs
				var newLeafs = [];
				var maxNodesInLevel = 20;
				var nodesLeft = tempLeafs.length;
				var theta, radius, maxRadius, myObj, x, z;
				var y = 5;
				var counter = 0;

				for (let i in tempLeafs) {
					//distributing in circle
					theta =
						(2 * Math.PI) / Math.min(maxNodesInLevel, nodesLeft);
					radius = maxNodesInLevel;

					x = radius * Math.cos(theta * counter);
					z = radius * Math.sin(theta * counter);

					myObj = {
						data: tempLeafs[i],
						position: [x, y, z],
					};
					newLeafs.push(myObj);
					counter += 1;

					if (counter === maxNodesInLevel) {
						maxRadius = radius;
						nodesLeft -= maxNodesInLevel;
						counter = 0;
						maxNodesInLevel += 5;
						y += 5; //distance added every level
					}
				}

				//spines
				var newSpines = [];

				//distributing in circle
				theta = (2 * Math.PI) / tempSpines.length;
				radius = tempSpines.length;
				y += 10;
				if (tempSpines.length % maxNodesInLevel !== 0) {
					y += 5;
				}
				for (let i in tempSpines) {
					x = radius * Math.cos(theta * i);
					z = radius * Math.sin(theta * i);
					myObj = {
						data: tempSpines[i],
						position: [x, y, z],
					};
					newSpines.push(myObj);
				}

				setLeafs(newLeafs);
				setSpines(newSpines);

				//links

				var tempCombined = [...newLeafs, ...newSpines];
				var newLinks = [];
				counter = 0;
				for (let i in newSpines) {
					for (let j in newSpines[i].data.fabricLinks) {
						counter++;
						const node2 =
							newSpines[i].data.fabricLinks[j].neighbourNode;

						//find target node
						const targetIndex = tempCombined
							.map((node) => node.data.nodeName)
							.indexOf(node2);

						//link
						if (
							targetIndex >= 0 &&
							targetIndex < tempCombined.length
						) {
							myObj = {
								color:
									"#" +
									((i / newSpines.length) * 0x00ffff * 783478)
										.toString(16)
										.slice(0, 6),
								src: newSpines[i].position,
								target: tempCombined[targetIndex].position,
								id: `${tempCombined[i].data.nodeName}${tempCombined[targetIndex].data.nodeName}${tempCombined[targetIndex].position}${counter}`,
							};
							newLinks.push(myObj);
						}
					}
				}
				setLinks(newLinks);

				//readjust camera's default location based on the data
				setDefaultCameraLoc([maxRadius*1.3, y + 10, maxRadius*1.3]);
				setDefaultCameraLookAt([0, y / 2, 0]);
			})

			.catch((error) => {
				setErrorMsg("could not fetch data");
			});
	}
	useEffect(() => {
		resetCamera();
	}, [defaultCameraLoc, defaultCameraLookAt]);
	// runs when the app is loaded for the first time
	useEffect(() => {
		resetCamera();
		fetchData1();
	}, []);

	const MyCanvas = useMemo(() => {
		return (
			<Main3DComp
				setStatusMsg={setStatusMsg}
				targetPosition={targetPosition}
				targetLookAt={targetLookAt}
				focusNodeLevel1={focusNodeLevel1}
				leafs={leafs}
				spines={spines}
				links={links}
				setHoverNode={setHoverNode}
				selectedNode={selectedNode}
				interfaces={interfaces}
				interfaceLink={interfaceLink}
				endpoints={endpoints}
				vms={epg}
				level3={level3}
				level3details={level3details}
				level3nodes={level3nodes}
				setHoverNode1={setHoverNode1}
				focusNodeLevel2={focusNodeLevel2}
				setHoverNode2={setHoverNode2}
				setHoverNode3={setHoverNode3}
				level2spine = {level2spine}
			/>
		);
	}, [
		targetPosition,
		targetLookAt,
		leafs,
		spines,
		links,
		selectedNode,
		interfaces,
		interfaceLink,
		endpoints,
		epg,
		level3,
		level3details,
		level3nodes,
		level2spine,
	]);
	return (
		<>
			{/* if the value of anomalyScore is between [20-40] -> Warning, [41-60] -> Minor, [61-80] -> Major, [81-100] -> Critical */}
			<Grid container>
				<Grid
					item
					xs={3}
					style={{
						backgroundColor: "#00253b",
						height: "100vh",
						overflow: "auto",
					}}
				>
					{/* side ui component */}

					<SideBarComp
						resetCamera={resetCamera}
						leafs={leafs}
						spines={spines}
						reloadLevel1={reloadLevel1}
						focusNodeLevel1={focusNodeLevel1}
						level3call={level3call}
						focusNodeLevel2={focusNodeLevel2}
						interfaces={interfaces}
						isinterface={isinterface}
						level3={level3}
						level3leaf={level3leaf}
						level3spine={level3spine}
						selectedNode={selectedNode}
					/>
				</Grid>

				<Grid
					item
					xs={9}
					style={{
						height: "100vh",
						backgroundColor: "black",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<div
						style={{
							position: "absolute",
							zIndex: 2,
							marginLeft: 10,
							marginTop: 10,
						}}
					>
						<NodePopUp nodeData={hoverNode} />
						<NodePopUp1 nodeData={hoverNode1} />
						<NodePopUp2 nodeData={hoverNode2} />
						<NodePopUp3 nodeData={hoverNode3} />
					</div>
					{/* this is the main 3d window */}
					<div style={{ height: "100%" }}>{MyCanvas}</div>

					<div
						style={{
							height: "30px",
							backgroundColor: "#00253b",
							width: "100%",
						}}
					>
						{/* indicates what is going on in the app currently */}
						<StatusBarComp
							statusMsg={statusMsg}
							errorMsg={errorMsg}
						/>
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
