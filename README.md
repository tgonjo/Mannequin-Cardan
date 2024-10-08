# Mannequin-Cardan
### Description
This web app (access the app [here](https://tgonjo.github.io/Mannequin-Cardan/)) is designed using JavaScript to interactively teach/learn the application of Cardan angle concepts to the human body, targeted to bachelor-level students who learn Biomechanics. 
This app is developed using [Mannequin.js](https://boytchev.github.io/mannequin.js/) and [Three.js](https://threejs.org/). The app runs through a Content Delivery Network [(jsDelivr)](https://www.jsdelivr.com/). 

### Definitions
+ **Cardan Angle**: In Biomechanics (particularly Sports Biomechanics), the term 'Euler Angle' is often used. However, what is actually often used in biomechanics is the 'Cardan angle'.
The Euler angle involves a rotational sequence with the same first and third axes (e.g., XYX or ZXZ), while the Cardan angle has a rotational sequence involving all three axes (e.g., XYZ or ZXY).
+ **Global Coordinates**: In this app, a Z-up right-hand coordinate system is used.
+ **Local Coordinates**: Each body segment of the mannequin has a local coordinate system. When the mannequin is standing upright with its feet together and the arms at its side,
the local x-axis and y-axis are respectively pointing towards the right and forward from the mannequin's perspective, and the local z-axis is pointing upward.
+ **Relative Angle**: It is the Cardan angle rotation of a segment in relation to the local coordinate system of another segment. 
  1. Neck Angle: The cardan angle of the head coordinate axes relative to the torso coordinate system.
  2. Trunk Angle: The cardan angle of the torso coordinate axes relative to the pelvis coordinate system.
  3. Shoulder Angle: The cardan angle of the upper arm coordinate axes relative to the torso coordinate system.
  4. Elbow Angle: The cardan angle of the lower arm coordinate axes relative to the upper arm coordinate system.
  5. Wrist Angle: The cardan angle of the hand coordinate axes relative to the lower arm coordinate system.
  6. Hip Angle: The cardan angle of the thigh coordinate axes relative to the torso coordinate system.
  7. Knee Angle: The cardan angle of the shank coordinate axes relative to the thigh coordinate system.
  8. Ankle Angle: The cardan angle of the foot coordinate axes relative to the shank coordinate system.
+ **Absolute Angle**: It refers to the Cardan angle rotation of a segment axes about the global coordinate system.

### Instructions for Users
1. Open the app on your web browser (access the app [here](https://tgonjo.github.io/Mannequin-Cardan/))
2. By default, the relative angle mode is selected. If you wish to use the app in Absolute Angle mode<sup>*1</sup>, switch the mode using the toggle switch on the top of the app screen.
3. Select a joint or segment you want to control, input the rotation angle around each axis, select the rotational sequence<sup>*2</sup>, and click "Apply Movement".
4. Based on the inputs, the mannequin changes its posture. On the right side of the app screen, the animation of the rotation of the local coordinate axes around the reference axes is displayed.
   * *1: In Absolute Angle mode, the app posture is reset to the default (standing position) each time the user clicks "Apply Movement".
   * *2: In Biomechanics, the recommended rotation sequence is the order of 1) rotation around the mediolateral axis 2) rotation around the anteroposterior axis 3) rotation around the longitudinal axis (Cole et al. 1993: https://doi.org/10.1115/1.2895496),
   which corresponds to x -> y -> z order in this app.

### Contributing to the development of the app
+ **Reporting bugs**: If you find any bugs in the app, please report them through [Github issues](https://github.com/tgonjo/Mannequin-Cardan/issues).
+ **Proposing/submitting a fix or new features**: All codes are available in the [Github repository](https://github.com/tgonjo/Mannequin-Cardan). If you want to update the app functions or fix bugs:
  1. Fork the repository to make a copy in your GitHub
  2. Pull the repository onto your local machine
  3. Create a branch from the main and edit the code
  4. After editing the code, check if everything works as you intended, push your changes to the GitHub repository 
  5. Issue the pull request

### License ###
This work is licensed under GNU General Public License v3.0
