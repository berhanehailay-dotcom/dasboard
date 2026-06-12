/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `name` (text, project name)
      - `description` (text, short description)
      - `thumbnail` (text, image URL)
      - `date` (date, project date)
      - `client_name` (text, client name)
      - `website` (text, website URL)
      - `input` (text, input/input link)
      - `service` (text array, services/tags)
      - `project_detail` (jsonb, tier descriptions)
      - `project_photos` (text array, photo URLs)
      - `project_testimonials` (jsonb array, testimonials)
      - `status` (text, 'draft' or 'published')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access on published projects
    - Add policy for future authenticated user access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  thumbnail text,
  date date,
  client_name text,
  website text,
  input text,
  service text[] DEFAULT '{}',
  project_detail jsonb DEFAULT '{}',
  project_photos text[] DEFAULT '{}',
  project_testimonials jsonb[] DEFAULT '{}',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published projects"
  ON projects
  FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage all projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
