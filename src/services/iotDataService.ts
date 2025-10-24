/**
 * IoT Data Service
 * 
 * This service is designed to receive and process attendance data from IoT devices
 * (RFID/NFC readers) to prevent proxy attendance.
 * 
 * Expected IoT Data Format:
 * {
 *   studentId: string,      // Unique student ID from RFID/NFC card
 *   timestamp: string,      // ISO timestamp from IoT device
 *   deviceId: string,       // IoT device identifier
 *   location: string,       // Classroom/location of the device
 *   cardData: string        // Encrypted card data for security
 * }
 */

export interface IoTAttendanceData {
  studentId: string;
  timestamp: string;
  deviceId: string;
  location: string;
  cardData: string;
}

export interface ProcessedAttendance {
  id: string;
  studentName: string;
  date: string;
  time: string;
  status: "present" | "absent" | "late";
  course: string;
}

/**
 * Process incoming IoT attendance data
 * This function will be connected to your IoT device endpoint
 */
export const processIoTData = (iotData: IoTAttendanceData): ProcessedAttendance => {
  const timestamp = new Date(iotData.timestamp);
  const date = timestamp.toISOString().split('T')[0];
  const time = timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Determine status based on timestamp
  // TODO: Configure class start times and late threshold
  const classStartHour = 9; // 9 AM
  const lateThresholdMinutes = 5;
  
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  
  let status: "present" | "late" = "present";
  if (hours === classStartHour && minutes > lateThresholdMinutes) {
    status = "late";
  } else if (hours > classStartHour) {
    status = "late";
  }

  return {
    id: `${iotData.studentId}-${timestamp.getTime()}`,
    studentName: iotData.studentId, // TODO: Map to actual student name from database
    date,
    time,
    status,
    course: iotData.location, // TODO: Map location to course name
  };
};

/**
 * API endpoint to receive IoT data
 * This would be connected to your IoT device
 */
export const receiveIoTAttendance = async (data: IoTAttendanceData): Promise<void> => {
  try {
    // Process the IoT data
    const processedData = processIoTData(data);
    
    // TODO: Send to backend/database when Lovable Cloud is enabled
    console.log('Processed IoT Attendance:', processedData);
    
    // TODO: Implement real-time update to dashboard
    // This could use WebSockets or Server-Sent Events for live updates
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error processing IoT attendance:', error);
    throw error;
  }
};

/**
 * Mock function to simulate IoT device data
 * Remove this when connecting real IoT devices
 */
export const simulateIoTDevice = (): IoTAttendanceData => {
  return {
    studentId: "STU" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
    timestamp: new Date().toISOString(),
    deviceId: "RFID-DEVICE-01",
    location: "Room-301",
    cardData: "encrypted_card_data_here"
  };
};
