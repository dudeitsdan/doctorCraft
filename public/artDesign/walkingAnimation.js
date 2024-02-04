import { doctorResource } from './imageResources.js'

export function displayWalking() {
    if (performance.now() - doctorResource.walkingTimer > 500) {
        doctorResource.walkingTimerMarker++;
        doctorResource.walkingTimer = performance.now();
        // console.log("frame:", doctorResource.walkingTimerMarker)
        if (doctorResource.walkingTimerMarker > doctorResource.docWalkArray.length-1) {
            doctorResource.walkingTimerMarker = 0 
        }
        doctorResource.docWalkimg.src = doctorResource.docWalkArray[doctorResource.walkingTimerMarker];
        // console.log(doctorResource.docWalkArray[doctorResource.walkingTimerMarker]) 
    }
    requestAnimationFrame(displayWalking)
    // console.log(doctorResource.docWalkimg.src)
} 
