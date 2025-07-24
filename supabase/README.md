🛡️ Supabase Schema & RLS
To create the backend used by this app:

1. Go to your Supabase project → SQL Editor

2. Run files in this order:

    enums.sql (create types)

    schema.sql (create trip_details table)

    policies.sql (enable RLS)

3. Done! Your Supabase instance is now ready to work with the app.

💡 Make sure to set your .env with your SUPABASE_URL and SUPABASE_ANON_KEY