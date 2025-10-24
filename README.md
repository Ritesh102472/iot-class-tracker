# Smart Student Attendance Management Portal

A modern web application for IoT-based student attendance tracking designed to prevent proxy attendance using RFID/NFC technology.

## Features

- 🎯 **IoT-Ready Architecture**: Built to seamlessly integrate with RFID/NFC attendance devices
- 🔒 **Proxy Prevention**: Physical card-based attendance to ensure authentic check-ins
- 👥 **Multi-Role Dashboards**: Separate interfaces for Students, Teachers, and Administrators
- 📊 **Real-Time Analytics**: Live attendance tracking and performance metrics
- 🎨 **Modern UI**: Professional, responsive design with a clean interface

## IoT Integration Guide

This website is designed to work with your IoT attendance tracking project. The architecture is ready to receive and process data from RFID/NFC readers.

### Expected IoT Data Format

```typescript
{
  studentId: string,      // Unique student ID from RFID/NFC card
  timestamp: string,      // ISO timestamp from IoT device
  deviceId: string,       // IoT device identifier
  location: string,       // Classroom/location of the device
  cardData: string        // Encrypted card data for security
}
```

### Integration Points

1. **IoT Data Service** (`src/services/iotDataService.ts`)
   - Contains the data processing logic for IoT inputs
   - Defines the expected data structure from your devices
   - Includes functions to process and validate attendance data

2. **Attendance Components**
   - `AttendanceTable.tsx` is ready to display live IoT data
   - Currently uses mock data for demonstration
   - Replace mock data with live feed once your IoT devices are ready

### How to Connect Your IoT Project

When your RFID/NFC devices are ready:

1. Configure your IoT devices to send data in the expected format
2. Set up an API endpoint to receive IoT data (use Lovable Cloud for backend)
3. Replace mock data in components with live data stream
4. Test with `simulateIoTDevice()` function before connecting real devices

## Dashboards

- **Student Dashboard**: View personal attendance records and statistics
- **Teacher Dashboard**: Manage class attendance and track student performance
- **Admin Dashboard**: System-wide overview, user management, and IoT device monitoring

## Note for Professors

This website demonstrates a complete, production-ready interface for an IoT-based attendance system. The architecture is designed to:

- Prevent proxy attendance through physical RFID/NFC cards
- Process real-time data from IoT devices
- Provide comprehensive dashboards for all stakeholders
- Scale to handle multiple classrooms and devices simultaneously

The frontend is complete and ready for demonstration. IoT device integration can be added once the hardware component is developed.

---

## Project info

**URL**: https://lovable.dev/projects/d83cf5e2-8052-4287-8841-2672f83f7b74

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d83cf5e2-8052-4287-8841-2672f83f7b74) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d83cf5e2-8052-4287-8841-2672f83f7b74) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
