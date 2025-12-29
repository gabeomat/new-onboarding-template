/*
  # Create Admin Users System

  ## Overview
  Creates a secure admin user management system where only existing admins can grant admin access to others.

  ## New Tables
  - `admin_users`
    - `user_id` (uuid, primary key) - References auth.users
    - `created_at` (timestamptz) - When admin access was granted
    - `created_by` (uuid, nullable) - Which admin granted this access

  ## Security
  - Enable RLS on `admin_users` table
  - Authenticated users can read the table to check if they're admin
  - Only existing admins can insert new admins
  - No one can update or delete admin records (data safety)

  ## Initial Setup
  - Inserts coachme@gabrielomat.com as the first admin
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read admin_users to check their own status
CREATE POLICY "Anyone can check admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Only existing admins can add new admins
CREATE POLICY "Only admins can create admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- No one can update admin records
CREATE POLICY "No updates allowed"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (false);

-- No one can delete admin records
CREATE POLICY "No deletes allowed"
  ON admin_users
  FOR DELETE
  TO authenticated
  USING (false);

-- Insert the first admin (coachme@gabrielomat.com)
INSERT INTO admin_users (user_id, created_by)
VALUES ('5bde940c-fe73-40c0-bf34-29f2dac22c1f', NULL)
ON CONFLICT (user_id) DO NOTHING;
