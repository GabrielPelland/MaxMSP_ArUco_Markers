# Augmented Reality Marker Detector - Usage and Calibration Instructions

This document provides guidance on how to use and calibrate the AR Marker Detector, which runs in Max MSP.

## Prerequisites

1. **Max MSP**: Ensure you have Max MSP installed on your machine.
2. **Dependencies**: The project uses the following JavaScript libraries:
    - `polyfill.js`
    - `cv.js`
    - `aruco.js`
    - `n4m.aruco.js`
      Ensure these files are available and correctly referenced in your environment.
3. **Camera Access**: A webcam or camera device capable of streaming video at a resolution of 2048x1080 pixels.

---

## Features

- Detects and tracks markers using ARUCO codes.
- Provides calibration functionality for aligning marker coordinates to a physical space.
- Filters markers based on predefined IDs.

---

## How to Use the Code

### Step 1: Start the Application

1. Launch Max MSP and open the project.
2. Ensure the camera is connected and functional.
3. Open the HTML-based interface in a supported browser (e.g., Chrome).
4. Allow camera access when prompted.

### Step 2: Enable Marker Detection

- The detector begins processing frames automatically after initialization.
- Detected markers will be displayed on the canvas along with their IDs, positions, and rotation.

### Step 3: Toggle Marker Filtering

- Click the "Enable Filter" button to filter markers based on predefined IDs (`qrIds`).
- To disable filtering, click the "Disable Filter" button.

---

## Calibration Instructions

### Purpose

Calibration ensures the detected markers are correctly mapped to physical dimensions (e.g., 980mm x 505mm).

### Step 1: Start Calibration

1. Click the **Calibrate** button.
2. Place all four calibration markers (IDs: `0`, `40`, `90`, `80`) in the camera's view.

### Step 2: Adjust Marker Placement

- Ensure all markers are clearly visible and not obstructed.
- The calibration markers should form a rectangle representing the physical dimensions.

### Step 3: Save Calibration

1. Click the **Save Calibration** button.
2. If all four markers are not detected, an error message will appear.
    - Adjust the placement of markers and try again.
3. Once calibration is saved, the system adjusts all subsequent marker detections.

---

## Advanced Features

### Adjusting qrIds and qrCalibration

- **qrIds**: These IDs determine which markers are detected during operation.
    - To change, locate the `qrIds` array in the script:
      ```javascript
      const qrIds = [0, 20, 30, 40, 50, 70, 80, 90];
      ```
      Add or remove marker IDs as needed.

- **qrCalibration**: These IDs are used for calibration.
    - To change, locate the `qrCalibration` array in the script:
      ```javascript
      const qrCalibration = [0, 40, 90, 80];
      ```
      Update with the new marker IDs you plan to use for calibration.

### Changing Camera Resolution

- Locate the `getUserMedia` function call in the script:
  ```javascript
  navigator.mediaDevices.getUserMedia({ video: { width: 2048, height: 1080 } })
  ```
  Update the `width` and `height` properties to match your desired resolution.

### Changing Physical Dimensions

- The script uses constants `SCALE_X` and `SCALE_Y` to represent the physical dimensions in millimeters:
  ```javascript
  const SCALE_X = 980; // Physical width in mm of the target area
  const SCALE_Y = 505; // Physical height in mm of the target area
  ```
  Update these values to match the actual dimensions of your physical setup.
    - For example, if your setup is 1000mm x 600mm, modify as follows:
      ```javascript
      const SCALE_X = 1000;
      const SCALE_Y = 600;
      ```
    - Ensure your calibration markers reflect the updated dimensions.

### Generate Markers

- Use the [Marker Creator Tool](https://damianofalcioni.github.io/js-aruco2/samples/marker-creator/marker-creator.html) to generate ARUCO markers.
- Ensure the dictionary is set to **ARUCO_MIP_36h12** for compatibility with this script.

---

## Optimize Performance

- The application limits processing to 30 FPS to balance performance and responsiveness.
- The canvas resolution is scaled down for efficient computation.

---

## Troubleshooting

1. **Markers Not Detected**:
    - Ensure the camera resolution is set to 2048x1080.
    - Verify marker IDs match the predefined values (qrIds or `qrCalibration`).
2. **Calibration Issues**:
    - Confirm all four calibration markers are visible.
    - Check that markers form a rectangular shape.
3. **Camera Not Accessible**:
    - Verify permissions for the browser to access the camera.
    - Restart the browser or application if needed.

---

## Additional Notes

- This project can be extended to support custom marker IDs and layouts.
- Ensure the backend endpoint (`http://localhost:3000/qr`) is running to handle marker data.

---

For further assistance, please refer to the documentation or contact the project maintainers.

