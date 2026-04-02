"use client";

import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "@/components/ui";

export default function ParentProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Profile Settings</h1>
        <p className="text-neutral-500">Manage your account and child details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Full Name</label>
              <Input defaultValue="Rajesh Kumar" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Email</label>
              <Input defaultValue="rajesh@example.com" type="email" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Phone</label>
              <Input defaultValue="+91 9876543210" className="mt-1" />
            </div>
            <Button>Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Child Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Child's Name</label>
              <Input defaultValue="Aryan Kumar" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Date of Birth</label>
              <Input defaultValue="2006-05-15" type="date" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Class/Year</label>
              <Input defaultValue="Class 12 (Science)" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">JEE Main Score</label>
              <Input defaultValue="250/300" className="mt-1" />
            </div>
            <Button>Update Child Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Email notifications for application updates</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">SMS alerts for important updates</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">WhatsApp notifications</span>
              <input type="checkbox" className="w-5 h-5" />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-700">Current Password</label>
              <Input type="password" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">New Password</label>
              <Input type="password" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Confirm Password</label>
              <Input type="password" className="mt-1" />
            </div>
            <Button>Change Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}