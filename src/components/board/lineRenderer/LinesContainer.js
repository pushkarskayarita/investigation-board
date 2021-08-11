// import React from 'react';
// import style from './lineRenderer.css';
// import LineRenderer from '../lineRenderer/LineRenderer';
//
// function createPosition(x1, y1, x2, y2) {
//     return { x1, y1, x2, y2 };
// }
//
// class LinesContainer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.pathContainer = React.createRef();
//         this.state = {
//             container: null,
//             drawing: false,
//             mousePositions: [],
//         };
//     }
//
//     componentDidMount() {
//         this.setState({
//             container: this.pathContainer.current,
//         });
//     }
//
//     handleMouseDown = (event) => {
//         if (this.props.pinMode) {
//             this.setState({
//                 drawing: true,
//             });
//
//             const { container } = this.state;
//             const containerCoords = container.getBoundingClientRect();
//             const { clientX, clientY } = event;
//             const left = clientX - containerCoords.left - container.clientLeft;
//             const top = clientY - containerCoords.top - container.clientTop;
//             const position = createPosition(left, top, left, top);
//             pins.push({ position });
//             this.setState((prevstate) => {
//                 return {
//                     mousePositions: [...prevstate.mousePositions, position],
//                 };
//             });
//             console.log('pins', pins);
//         }
//     };
//
//     handleMouseMove = (event) => {
//         if (!this.state.drawing) return;
//         let posAr = this.state.mousePositions;
//         const { container } = this.state;
//         const containerCoords = container.getBoundingClientRect();
//
//         const { clientX, clientY } = event;
//         const { x1, y1 } = posAr[posAr.length - 1];
//
//         const left = clientX - containerCoords.left - container.clientLeft;
//         const top = clientY - containerCoords.top - container.clientTop;
//
//         const updatePosition = createPosition(x1, y1, left, top);
//
//         const mousePositionsCopy = [...posAr];
//         mousePositionsCopy[posAr.length - 1] = updatePosition;
//         this.setState({
//             mousePositions: mousePositionsCopy,
//         });
//     };
//
//     handleMouseUp = () => {
//         if (this.props.pinMode) {
//             this.setState({
//                 drawing: false,
//             });
//         }
//     };
//
//     render() {
//         return (
//             <div
//                 onMouseDownCapture={this.handleMouseDown}
//                 onMouseMove={this.handleMouseMove}
//                 onMouseUp={this.handleMouseUp}
//                 className={`${style.linesContainer} droppable `}
//                 ref={this.pathContainer}
//             >
//                 <ul>
//                     {pins.map((pin) => {
//                         return (
//                             <Pin
//                                 key={counter++}
//                                 draggableId={pin.draggableId}
//                                 position={pin.position}
//                             />
//                         );
//                     })}
//                 </ul>
//                 {this.props.children}
//                 <LineRenderer mousePositions={this.state.mousePositions} />
//             </div>
//         );
//     }
// }
//
// export default LinesContainer;
