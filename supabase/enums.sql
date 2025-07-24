-- Enum for type of accommodation
CREATE TYPE accommodation AS ENUM ('Hotel', 'Hostel', 'Airbnb', 'Camping');

-- Enum for budget range
CREATE TYPE budget AS ENUM ('Cheap', 'Moderate', 'Luxury');

-- Enum for travel partner type
CREATE TYPE partner AS ENUM ('Just Me', 'Couple', 'Family', 'Friends');