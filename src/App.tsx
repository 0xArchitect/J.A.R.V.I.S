import { ENABLE_GUI } from 'constants/common';

import { GUI } from 'dat.gui';
import GSAP from 'gsap';
import FlightList from 'pages/FlightList';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import * as THREE from 'three';

GSAP.defaults({
  ease: 'power2',
  duration: 2.6,
  overwrite: true,
});

window.eventDispatcher = new THREE.EventDispatcher();
window.gui = new GUI();
window.virtualScrollX = 0;
window.virtualScrollY = 0;

// TODO: conditionally hide GUI on development, staging and production branch
if (!ENABLE_GUI) window.gui.hide();

function App() {
  return (
    <Routes>
      <Route path="/" element={<FlightList />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
