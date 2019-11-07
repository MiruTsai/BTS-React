import React from "react";

const QuizAnime = (props) => {
    let groupLoadingAnime;
    if (props.Group === "BTS") {
        groupLoadingAnime = <svg id="BTSLOGO" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
            <path id="BTS" className="cls-1" d="M308.672,789.636h0c52.9,0,94.773-39.63,94.773-92.47,0-51.74-41.876-90.269-94.773-90.269H170.92c-7.714,0-14.326,5.5-14.326,12.109s6.612,12.109,14.326,12.109H308.672c37.468,0,68.325,27.521,68.325,66.051s-30.857,66.05-68.325,66.05H263.489c-6.612,0-12.122,6.605-12.122,13.21s5.51,13.21,12.122,13.21h45.183ZM170.92,316.276H308.672C346.14,316.276,377,343.8,377,382.327s-30.857,66.05-68.325,66.05H263.489c-6.612,0-12.122,5.5-12.122,13.21A12.223,12.223,0,0,0,263.489,473.7h45.183c52.9,0,94.773-39.63,94.773-91.369s-41.876-91.37-94.773-91.37H170.92c-8.816,0-14.326,5.5-14.326,12.109S162.1,316.276,170.92,316.276ZM25.454,933.845h0V157.756H323c123.426,0,220.4,101.277,220.4,224.571,0,55.041-18.734,107.881-55.1,149.713a11.963,11.963,0,0,0,0,16.513c36.367,41.832,55.1,93.571,55.1,148.613,0,122.192-96.977,224.57-220.4,224.57H170.92c-7.714,0-13.224,5.5-13.224,12.109,0,8.807,5.51,14.311,13.224,14.311H323c137.752,0,246.852-113.386,246.852-250.99,0-57.244-19.837-112.286-55.1-157.42a253.344,253.344,0,0,0,55.1-157.419c0-137.6-109.1-250.991-246.852-250.991H11.127c-6.612,0-12.122,6.6-12.122,14.311v788.2c0,8.807,5.51,14.311,12.122,14.311C18.842,948.156,25.454,942.652,25.454,933.845ZM1261.9,292.058H1064.64a12.225,12.225,0,0,0-12.13,12.109V933.845a12.125,12.125,0,0,0,24.25,0V318.478H1261.9c6.61,0,12.12-6.605,12.12-14.311A12.223,12.223,0,0,0,1261.9,292.058Zm-551.012-132.1h549.9c7.72,0,13.23-5.5,13.23-12.11s-5.51-12.109-13.23-12.109h-549.9A12.11,12.11,0,1,0,710.888,159.958Zm0,158.52H894.925V933.845c0,6.605,5.51,12.11,13.224,12.11a12.224,12.224,0,0,0,12.122-12.11V304.167a12.223,12.223,0,0,0-12.122-12.109H710.888a12.223,12.223,0,0,0-12.122,12.109C698.766,311.873,704.276,318.478,710.888,318.478ZM1418.37,893.114h0c44.08,22.017,85.95,36.328,125.63,45.135,200.56,47.336,377.99-38.53,377.99-237.781s-241.34-239.982-290.93-277.411c-15.43-12.109-24.25-29.722-24.25-46.235-1.1-37.428,28.65-57.243,61.72-61.646,51.79-5.5,119.01,15.411,157.58,30.823,15.43,6.6,25.35-16.513,9.92-23.118-63.92-26.42-113.51-36.327-166.4-33.025-50.7,2.2-90.37,39.63-88.16,90.269,6.61,100.176,143.26,79.26,251.26,180.537,93.67,85.865,77.14,223.47,2.2,299.427-98.08,97.975-276.61,77.059-403.34,11.009C1416.16,863.392,1404.04,885.409,1418.37,893.114Zm437.5-728.753h0c-51.8-17.613-91.47-26.42-122.33-30.823-177.42-24.219-310.76,78.159-310.76,248.789,0,204.755,241.34,233.377,293.13,276.309,25.35,23.118,29.76,62.748,3.31,86.966-55.1,50.639-197.26,9.908-266.69-38.529-13.22-8.807-28.65,11.009-14.33,20.916,70.53,51.739,159.8,69.353,229.22,64.949,51.8-3.3,98.08-39.63,94.78-91.369-6.62-101.277-141.06-82.563-249.06-176.134-94.77-84.764-77.14-224.57-6.61-300.528,87.06-94.672,222.61-78.159,340.52-37.428C1862.48,194.084,1871.3,169.865,1855.87,164.361Z" />
            <path id="BTS" className="cls-2" d="M308.672,789.636h0c52.9,0,94.773-39.63,94.773-92.47,0-51.74-41.876-90.269-94.773-90.269H170.92c-7.714,0-14.326,5.5-14.326,12.109s6.612,12.109,14.326,12.109H308.672c37.468,0,68.325,27.521,68.325,66.051s-30.857,66.05-68.325,66.05H263.489c-6.612,0-12.122,6.605-12.122,13.21s5.51,13.21,12.122,13.21h45.183ZM170.92,316.276H308.672C346.14,316.276,377,343.8,377,382.327s-30.857,66.05-68.325,66.05H263.489c-6.612,0-12.122,5.5-12.122,13.21A12.223,12.223,0,0,0,263.489,473.7h45.183c52.9,0,94.773-39.63,94.773-91.369s-41.876-91.37-94.773-91.37H170.92c-8.816,0-14.326,5.5-14.326,12.109S162.1,316.276,170.92,316.276ZM25.454,933.845h0V157.756H323c123.426,0,220.4,101.277,220.4,224.571,0,55.041-18.734,107.881-55.1,149.713a11.963,11.963,0,0,0,0,16.513c36.367,41.832,55.1,93.571,55.1,148.613,0,122.192-96.977,224.57-220.4,224.57H170.92c-7.714,0-13.224,5.5-13.224,12.109,0,8.807,5.51,14.311,13.224,14.311H323c137.752,0,246.852-113.386,246.852-250.99,0-57.244-19.837-112.286-55.1-157.42a253.344,253.344,0,0,0,55.1-157.419c0-137.6-109.1-250.991-246.852-250.991H11.127c-6.612,0-12.122,6.6-12.122,14.311v788.2c0,8.807,5.51,14.311,12.122,14.311C18.842,948.156,25.454,942.652,25.454,933.845ZM1261.9,292.058H1064.64a12.225,12.225,0,0,0-12.13,12.109V933.845a12.125,12.125,0,0,0,24.25,0V318.478H1261.9c6.61,0,12.12-6.605,12.12-14.311A12.223,12.223,0,0,0,1261.9,292.058Zm-551.012-132.1h549.9c7.72,0,13.23-5.5,13.23-12.11s-5.51-12.109-13.23-12.109h-549.9A12.11,12.11,0,1,0,710.888,159.958Zm0,158.52H894.925V933.845c0,6.605,5.51,12.11,13.224,12.11a12.224,12.224,0,0,0,12.122-12.11V304.167a12.223,12.223,0,0,0-12.122-12.109H710.888a12.223,12.223,0,0,0-12.122,12.109C698.766,311.873,704.276,318.478,710.888,318.478ZM1418.37,893.114h0c44.08,22.017,85.95,36.328,125.63,45.135,200.56,47.336,377.99-38.53,377.99-237.781s-241.34-239.982-290.93-277.411c-15.43-12.109-24.25-29.722-24.25-46.235-1.1-37.428,28.65-57.243,61.72-61.646,51.79-5.5,119.01,15.411,157.58,30.823,15.43,6.6,25.35-16.513,9.92-23.118-63.92-26.42-113.51-36.327-166.4-33.025-50.7,2.2-90.37,39.63-88.16,90.269,6.61,100.176,143.26,79.26,251.26,180.537,93.67,85.865,77.14,223.47,2.2,299.427-98.08,97.975-276.61,77.059-403.34,11.009C1416.16,863.392,1404.04,885.409,1418.37,893.114Zm437.5-728.753h0c-51.8-17.613-91.47-26.42-122.33-30.823-177.42-24.219-310.76,78.159-310.76,248.789,0,204.755,241.34,233.377,293.13,276.309,25.35,23.118,29.76,62.748,3.31,86.966-55.1,50.639-197.26,9.908-266.69-38.529-13.22-8.807-28.65,11.009-14.33,20.916,70.53,51.739,159.8,69.353,229.22,64.949,51.8-3.3,98.08-39.63,94.78-91.369-6.62-101.277-141.06-82.563-249.06-176.134-94.77-84.764-77.14-224.57-6.61-300.528,87.06-94.672,222.61-78.159,340.52-37.428C1862.48,194.084,1871.3,169.865,1855.87,164.361Z" />
            <path id="BTS" className="cls-3" d="M308.672,789.636h0c52.9,0,94.773-39.63,94.773-92.47,0-51.74-41.876-90.269-94.773-90.269H170.92c-7.714,0-14.326,5.5-14.326,12.109s6.612,12.109,14.326,12.109H308.672c37.468,0,68.325,27.521,68.325,66.051s-30.857,66.05-68.325,66.05H263.489c-6.612,0-12.122,6.605-12.122,13.21s5.51,13.21,12.122,13.21h45.183ZM170.92,316.276H308.672C346.14,316.276,377,343.8,377,382.327s-30.857,66.05-68.325,66.05H263.489c-6.612,0-12.122,5.5-12.122,13.21A12.223,12.223,0,0,0,263.489,473.7h45.183c52.9,0,94.773-39.63,94.773-91.369s-41.876-91.37-94.773-91.37H170.92c-8.816,0-14.326,5.5-14.326,12.109S162.1,316.276,170.92,316.276ZM25.454,933.845h0V157.756H323c123.426,0,220.4,101.277,220.4,224.571,0,55.041-18.734,107.881-55.1,149.713a11.963,11.963,0,0,0,0,16.513c36.367,41.832,55.1,93.571,55.1,148.613,0,122.192-96.977,224.57-220.4,224.57H170.92c-7.714,0-13.224,5.5-13.224,12.109,0,8.807,5.51,14.311,13.224,14.311H323c137.752,0,246.852-113.386,246.852-250.99,0-57.244-19.837-112.286-55.1-157.42a253.344,253.344,0,0,0,55.1-157.419c0-137.6-109.1-250.991-246.852-250.991H11.127c-6.612,0-12.122,6.6-12.122,14.311v788.2c0,8.807,5.51,14.311,12.122,14.311C18.842,948.156,25.454,942.652,25.454,933.845ZM1261.9,292.058H1064.64a12.225,12.225,0,0,0-12.13,12.109V933.845a12.125,12.125,0,0,0,24.25,0V318.478H1261.9c6.61,0,12.12-6.605,12.12-14.311A12.223,12.223,0,0,0,1261.9,292.058Zm-551.012-132.1h549.9c7.72,0,13.23-5.5,13.23-12.11s-5.51-12.109-13.23-12.109h-549.9A12.11,12.11,0,1,0,710.888,159.958Zm0,158.52H894.925V933.845c0,6.605,5.51,12.11,13.224,12.11a12.224,12.224,0,0,0,12.122-12.11V304.167a12.223,12.223,0,0,0-12.122-12.109H710.888a12.223,12.223,0,0,0-12.122,12.109C698.766,311.873,704.276,318.478,710.888,318.478ZM1418.37,893.114h0c44.08,22.017,85.95,36.328,125.63,45.135,200.56,47.336,377.99-38.53,377.99-237.781s-241.34-239.982-290.93-277.411c-15.43-12.109-24.25-29.722-24.25-46.235-1.1-37.428,28.65-57.243,61.72-61.646,51.79-5.5,119.01,15.411,157.58,30.823,15.43,6.6,25.35-16.513,9.92-23.118-63.92-26.42-113.51-36.327-166.4-33.025-50.7,2.2-90.37,39.63-88.16,90.269,6.61,100.176,143.26,79.26,251.26,180.537,93.67,85.865,77.14,223.47,2.2,299.427-98.08,97.975-276.61,77.059-403.34,11.009C1416.16,863.392,1404.04,885.409,1418.37,893.114Zm437.5-728.753h0c-51.8-17.613-91.47-26.42-122.33-30.823-177.42-24.219-310.76,78.159-310.76,248.789,0,204.755,241.34,233.377,293.13,276.309,25.35,23.118,29.76,62.748,3.31,86.966-55.1,50.639-197.26,9.908-266.69-38.529-13.22-8.807-28.65,11.009-14.33,20.916,70.53,51.739,159.8,69.353,229.22,64.949,51.8-3.3,98.08-39.63,94.78-91.369-6.62-101.277-141.06-82.563-249.06-176.134-94.77-84.764-77.14-224.57-6.61-300.528,87.06-94.672,222.61-78.159,340.52-37.428C1862.48,194.084,1871.3,169.865,1855.87,164.361Z" />
        </svg>;
    } else if (props.Group === "IZONE") {
        groupLoadingAnime = <svg id="IZONElogo" data-name="圖層 1" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 302.69 55.67">
            <path className="Ils-2" d="M24.62,66.48a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79.8.8,0,0,1,.8.79V65.69A.8.8,0,0,1,24.62,66.48Zm10.3,0a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79.8.8,0,0,1,.79.79V65.69A.8.8,0,0,1,34.92,66.48Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-1" d="M24.62,66.48a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79.8.8,0,0,1,.8.79V65.69A.8.8,0,0,1,24.62,66.48Zm10.3,0a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79.8.8,0,0,1,.79.79V65.69A.8.8,0,0,1,34.92,66.48Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-3" d="M94.61,65.69a.82.82,0,0,1-.86.79H58.61c-.72,0-1.23-.5-.94-1.15L74,25.37H60.12a.84.84,0,0,1-.79-.94.8.8,0,0,1,.79-.79H75.24A.81.81,0,0,1,76,24.86L59.69,64.76H93.75A.89.89,0,0,1,94.61,65.69ZM59.33,14.21a.87.87,0,0,1,.79-.87H90.44a.87.87,0,0,1,.86,1.23L75,54.53H93.75a.82.82,0,0,1,.86.79.83.83,0,0,1-.86.87h-20A.78.78,0,0,1,73,55L89.28,15H60.12A.8.8,0,0,1,59.33,14.21Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-2" d="M94.61,65.69a.82.82,0,0,1-.86.79H58.61c-.72,0-1.23-.5-.94-1.15L74,25.37H60.12a.84.84,0,0,1-.79-.94.8.8,0,0,1,.79-.79H75.24A.81.81,0,0,1,76,24.86L59.69,64.76H93.75A.89.89,0,0,1,94.61,65.69ZM59.33,14.21a.87.87,0,0,1,.79-.87H90.44a.87.87,0,0,1,.86,1.23L75,54.53H93.75a.82.82,0,0,1,.86.79.83.83,0,0,1-.86.87h-20A.78.78,0,0,1,73,55L89.28,15H60.12A.8.8,0,0,1,59.33,14.21Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-2" d="M203.84,32.64a.81.81,0,0,1-1.08-.57,26.12,26.12,0,0,0-25-18c-15.27,0-25.85,10.8-25.85,25.78s10.58,25.85,25.85,25.85a26.09,26.09,0,0,0,25-18.07.81.81,0,0,1,1.08-.58.89.89,0,0,1,.57,1.08,27.92,27.92,0,0,1-26.64,19.3c-16.27,0-27.51-11.66-27.51-27.58s11.24-27.5,27.51-27.5a28,28,0,0,1,26.64,19.22A.86.86,0,0,1,203.84,32.64ZM163.66,47.11a1,1,0,0,1,1.22.29A14.73,14.73,0,0,0,177.77,55a15.2,15.2,0,0,0,0-30.39,14.72,14.72,0,0,0-12.89,7.63.91.91,0,0,1-1.22.36,1,1,0,0,1-.29-1.22A16.57,16.57,0,0,1,177.77,23a16.89,16.89,0,1,1-14.4,25.28A.91.91,0,0,1,163.66,47.11Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-3" d="M203.84,32.64a.81.81,0,0,1-1.08-.57,26.12,26.12,0,0,0-25-18c-15.27,0-25.85,10.8-25.85,25.78s10.58,25.85,25.85,25.85a26.09,26.09,0,0,0,25-18.07.81.81,0,0,1,1.08-.58.89.89,0,0,1,.57,1.08,27.92,27.92,0,0,1-26.64,19.3c-16.27,0-27.51-11.66-27.51-27.58s11.24-27.5,27.51-27.5a28,28,0,0,1,26.64,19.22A.86.86,0,0,1,203.84,32.64ZM163.66,47.11a1,1,0,0,1,1.22.29A14.73,14.73,0,0,0,177.77,55a15.2,15.2,0,0,0,0-30.39,14.72,14.72,0,0,0-12.89,7.63.91.91,0,0,1-1.22.36,1,1,0,0,1-.29-1.22A16.57,16.57,0,0,1,177.77,23a16.89,16.89,0,1,1-14.4,25.28A.91.91,0,0,1,163.66,47.11Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-2" d="M228.53,65.69V14.28a.83.83,0,1,1,1.65,0V65.69A.83.83,0,0,1,228.53,65.69Zm10.8-51.91,20.88,29.81V14.28a.87.87,0,0,1,1.73,0v32a.88.88,0,0,1-1.59.5L238,14.71C237.38,13.85,238.75,12.84,239.33,13.78Zm22,52.42L240.55,36.31V65.69a.86.86,0,0,1-1.72,0v-32a.88.88,0,0,1,1.58-.5l22.32,32A.88.88,0,0,1,261.29,66.2Zm9.15-.51V14.28a.86.86,0,1,1,1.72,0V65.69A.86.86,0,0,1,270.44,65.69Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-1" d="M228.53,65.69V14.28a.83.83,0,1,1,1.65,0V65.69A.83.83,0,0,1,228.53,65.69Zm10.8-51.91,20.88,29.81V14.28a.87.87,0,0,1,1.73,0v32a.88.88,0,0,1-1.59.5L238,14.71C237.38,13.85,238.75,12.84,239.33,13.78Zm22,52.42L240.55,36.31V65.69a.86.86,0,0,1-1.72,0v-32a.88.88,0,0,1,1.58-.5l22.32,32A.88.88,0,0,1,261.29,66.2Zm9.15-.51V14.28a.86.86,0,1,1,1.72,0V65.69A.86.86,0,0,1,270.44,65.69Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-2" d="M228.53,65.69V14.28a.83.83,0,1,1,1.65,0V65.69A.83.83,0,0,1,228.53,65.69Zm10.8-51.91,20.88,29.81V14.28a.87.87,0,0,1,1.73,0v32a.88.88,0,0,1-1.59.5L238,14.71C237.38,13.85,238.75,12.84,239.33,13.78Zm22,52.42L240.55,36.31V65.69a.86.86,0,0,1-1.72,0v-32a.88.88,0,0,1,1.58-.5l22.32,32A.88.88,0,0,1,261.29,66.2Zm9.15-.51V14.28a.86.86,0,1,1,1.72,0V65.69A.86.86,0,0,1,270.44,65.69Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-3" d="M326.45,65.69a.8.8,0,0,1-.79.79H299a.82.82,0,0,1-.87-.79V14.21a.82.82,0,0,1,.87-.79h26.64a.8.8,0,0,1,.79.79.82.82,0,0,1-.79.86H299.81V64.83h25.85A.82.82,0,0,1,326.45,65.69Zm0-41.19a.82.82,0,0,1-.79.87H310.1v8.57h10.73a.87.87,0,1,1,0,1.73H309.31a.88.88,0,0,1-.86-.87V24.5a.82.82,0,0,1,.86-.79h16.35A.8.8,0,0,1,326.45,24.5ZM321.7,45.1a.82.82,0,0,1-.87.79H310.1v8.64h15.56a.82.82,0,0,1,.79.87.8.8,0,0,1-.79.79H309.31a.82.82,0,0,1-.86-.79V45.1a.83.83,0,0,1,.86-.87h11.52A.83.83,0,0,1,321.7,45.1Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-2" d="M326.45,65.69a.8.8,0,0,1-.79.79H299a.82.82,0,0,1-.87-.79V14.21a.82.82,0,0,1,.87-.79h26.64a.8.8,0,0,1,.79.79.82.82,0,0,1-.79.86H299.81V64.83h25.85A.82.82,0,0,1,326.45,65.69Zm0-41.19a.82.82,0,0,1-.79.87H310.1v8.57h10.73a.87.87,0,1,1,0,1.73H309.31a.88.88,0,0,1-.86-.87V24.5a.82.82,0,0,1,.86-.79h16.35A.8.8,0,0,1,326.45,24.5ZM321.7,45.1a.82.82,0,0,1-.87.79H310.1v8.64h15.56a.82.82,0,0,1,.79.87.8.8,0,0,1-.79.79H309.31a.82.82,0,0,1-.86-.79V45.1a.83.83,0,0,1,.86-.87h11.52A.83.83,0,0,1,321.7,45.1Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-2" d="M130,21.29l-7.52,1.35L127.73,29,124,31.58l-4.11-7.19-4.12,7.19L112.06,29l5.28-6.37-7.54-1.35,1.47-4.16,7.11,2.79-.84-8.17h4.73l-.84,8.17,7.08-2.79Z" transform="translate(-23.76 -11.75)" />
            <path className="Ils-3" d="M130,21.29l-7.52,1.35L127.73,29,124,31.58l-4.11-7.19-4.12,7.19L112.06,29l5.28-6.37-7.54-1.35,1.47-4.16,7.11,2.79-.84-8.17h4.73l-.84,8.17,7.08-2.79Z" transform="translate(-23.76 -11.75)" />
        </svg>
    } else {
        groupLoadingAnime = <svg id="TWICElogo" data-name="圖層 1" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 263.38 54.64">
            <path className="Ils-3" d="M19.44,14.28a.8.8,0,0,1,.79-.79H56.16a.79.79,0,1,1,0,1.58H20.23A.8.8,0,0,1,19.44,14.28Zm0,10.22a.8.8,0,0,1,.79-.79H33.12a.8.8,0,0,1,.79.79V65.69a.8.8,0,0,1-.79.79.82.82,0,0,1-.86-.79V25.44h-12A.89.89,0,0,1,19.44,24.5ZM57,24.5a.89.89,0,0,1-.79.94H44.14V65.69a.8.8,0,0,1-1.59,0V24.5a.8.8,0,0,1,.8-.79H56.24A.8.8,0,0,1,57,24.5Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-2" d="M19.44,14.28a.8.8,0,0,1,.79-.79H56.16a.79.79,0,1,1,0,1.58H20.23A.8.8,0,0,1,19.44,14.28Zm0,10.22a.8.8,0,0,1,.79-.79H33.12a.8.8,0,0,1,.79.79V65.69a.8.8,0,0,1-.79.79.82.82,0,0,1-.86-.79V25.44h-12A.89.89,0,0,1,19.44,24.5ZM57,24.5a.89.89,0,0,1-.79.94H44.14V65.69a.8.8,0,0,1-1.59,0V24.5a.8.8,0,0,1,.8-.79H56.24A.8.8,0,0,1,57,24.5Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-3" d="M137.38,14a.85.85,0,0,1,.43,1.08l-21.17,52a.84.84,0,0,1-1.08.43.61.61,0,0,1-.5-.43l-9.22-22.61L96.7,67.06a.85.85,0,0,1-1.08.43.64.64,0,0,1-.51-.43L74,15.07c-.29-.43,0-.86.43-1.08a.76.76,0,0,1,1,.51L96,64.54,105.12,42a.87.87,0,0,1,1.59,0l9.14,22.54,20.45-50A.78.78,0,0,1,137.38,14ZM85.61,14a.87.87,0,0,1,1.15.51L96,37l9.14-22.46A.8.8,0,0,1,106.2,14a1.19,1.19,0,0,1,.51.51L115.85,37l9.22-22.46a.75.75,0,0,1,1-.51.86.86,0,0,1,.57,1.08l-10,24.48a.88.88,0,0,1-1.58,0l-9.22-22.61L96.7,39.55a.89.89,0,0,1-1.59,0L85.18,15.07A.92.92,0,0,1,85.61,14Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-2" d="M137.38,14a.85.85,0,0,1,.43,1.08l-21.17,52a.84.84,0,0,1-1.08.43.61.61,0,0,1-.5-.43l-9.22-22.61L96.7,67.06a.85.85,0,0,1-1.08.43.64.64,0,0,1-.51-.43L74,15.07c-.29-.43,0-.86.43-1.08a.76.76,0,0,1,1,.51L96,64.54,105.12,42a.87.87,0,0,1,1.59,0l9.14,22.54,20.45-50A.78.78,0,0,1,137.38,14ZM85.61,14a.87.87,0,0,1,1.15.51L96,37l9.14-22.46A.8.8,0,0,1,106.2,14a1.19,1.19,0,0,1,.51.51L115.85,37l9.22-22.46a.75.75,0,0,1,1-.51.86.86,0,0,1,.57,1.08l-10,24.48a.88.88,0,0,1-1.58,0l-9.22-22.61L96.7,39.55a.89.89,0,0,1-1.59,0L85.18,15.07A.92.92,0,0,1,85.61,14Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-3" d="M159.41,66.48a.82.82,0,0,1-.87-.79V14.21a.82.82,0,0,1,.87-.79.8.8,0,0,1,.79.79V65.69A.8.8,0,0,1,159.41,66.48Zm10.29,0a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79.8.8,0,0,1,.8.79V65.69A.8.8,0,0,1,169.7,66.48Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-2" d="M159.41,66.48a.82.82,0,0,1-.87-.79V14.21a.82.82,0,0,1,.87-.79.8.8,0,0,1,.79.79V65.69A.8.8,0,0,1,159.41,66.48Zm10.29,0a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79.8.8,0,0,1,.8.79V65.69A.8.8,0,0,1,169.7,66.48Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-3" d="M231.77,16.08a.84.84,0,0,1-1.08.43,25.4,25.4,0,0,0-9.79-1.94c-12.1,0-19.8,6.55-23.19,14.76a28.25,28.25,0,0,0,0,20.59c3.39,8.36,11.09,14.76,23.19,14.76a24,24,0,0,0,9.79-1.94.93.93,0,0,1,1.08.43.84.84,0,0,1-.43,1.15,27.18,27.18,0,0,1-10.44,2c-12.82,0-21-6.91-24.63-15.77a29.29,29.29,0,0,1,0-21.82c3.6-8.93,11.81-15.84,24.63-15.84A27.25,27.25,0,0,1,231.34,15,.83.83,0,0,1,231.77,16.08ZM230.4,52.59a.81.81,0,0,1-.29,1.08A17.16,17.16,0,0,1,220.9,56c-7.64,0-12.6-4.17-14.69-9.65a18.44,18.44,0,0,1,0-13.32c2.09-5.47,7-9.72,14.69-9.72a17.25,17.25,0,0,1,9.21,2.3.89.89,0,0,1,.29,1.16.79.79,0,0,1-1.08.28,16.27,16.27,0,0,0-8.42-2.08c-6.92,0-11.24,3.81-13.18,8.64a16.91,16.91,0,0,0,0,12.17c1.94,4.89,6.26,8.64,13.18,8.64a15.69,15.69,0,0,0,8.42-2.16A.76.76,0,0,1,230.4,52.59Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-2" d="M231.77,16.08a.84.84,0,0,1-1.08.43,25.4,25.4,0,0,0-9.79-1.94c-12.1,0-19.8,6.55-23.19,14.76a28.25,28.25,0,0,0,0,20.59c3.39,8.36,11.09,14.76,23.19,14.76a24,24,0,0,0,9.79-1.94.93.93,0,0,1,1.08.43.84.84,0,0,1-.43,1.15,27.18,27.18,0,0,1-10.44,2c-12.82,0-21-6.91-24.63-15.77a29.29,29.29,0,0,1,0-21.82c3.6-8.93,11.81-15.84,24.63-15.84A27.25,27.25,0,0,1,231.34,15,.83.83,0,0,1,231.77,16.08ZM230.4,52.59a.81.81,0,0,1-.29,1.08A17.16,17.16,0,0,1,220.9,56c-7.64,0-12.6-4.17-14.69-9.65a18.44,18.44,0,0,1,0-13.32c2.09-5.47,7-9.72,14.69-9.72a17.25,17.25,0,0,1,9.21,2.3.89.89,0,0,1,.29,1.16.79.79,0,0,1-1.08.28,16.27,16.27,0,0,0-8.42-2.08c-6.92,0-11.24,3.81-13.18,8.64a16.91,16.91,0,0,0,0,12.17c1.94,4.89,6.26,8.64,13.18,8.64a15.69,15.69,0,0,0,8.42-2.16A.76.76,0,0,1,230.4,52.59Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-3" d="M282.82,65.69a.8.8,0,0,1-.8.79H255.38a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79H282a.8.8,0,0,1,.8.79.82.82,0,0,1-.8.86H256.17V64.83H282A.82.82,0,0,1,282.82,65.69Zm0-41.19a.82.82,0,0,1-.8.87H266.47v8.57H277.2a.87.87,0,0,1,0,1.73H265.68a.88.88,0,0,1-.86-.87V24.5a.82.82,0,0,1,.86-.79H282A.8.8,0,0,1,282.82,24.5Zm-4.76,20.6a.82.82,0,0,1-.86.79H266.47v8.64H282a.82.82,0,0,1,.8.87.8.8,0,0,1-.8.79H265.68a.82.82,0,0,1-.86-.79V45.1a.83.83,0,0,1,.86-.87H277.2A.83.83,0,0,1,278.06,45.1Z" transform="translate(-19.44 -12.91)" />
            <path className="Ils-2" d="M282.82,65.69a.8.8,0,0,1-.8.79H255.38a.82.82,0,0,1-.86-.79V14.21a.82.82,0,0,1,.86-.79H282a.8.8,0,0,1,.8.79.82.82,0,0,1-.8.86H256.17V64.83H282A.82.82,0,0,1,282.82,65.69Zm0-41.19a.82.82,0,0,1-.8.87H266.47v8.57H277.2a.87.87,0,0,1,0,1.73H265.68a.88.88,0,0,1-.86-.87V24.5a.82.82,0,0,1,.86-.79H282A.8.8,0,0,1,282.82,24.5Zm-4.76,20.6a.82.82,0,0,1-.86.79H266.47v8.64H282a.82.82,0,0,1,.8.87.8.8,0,0,1-.8.79H265.68a.82.82,0,0,1-.86-.79V45.1a.83.83,0,0,1,.86-.87H277.2A.83.83,0,0,1,278.06,45.1Z" transform="translate(-19.44 -12.91)" />
        </svg>
    }
    return (<div className={props.animeClass}>
        {groupLoadingAnime}
    </div>)
}
export default QuizAnime;