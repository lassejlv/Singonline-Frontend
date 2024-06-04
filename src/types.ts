export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      Albums: {
        Row: {
          artist_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          release_date: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          artist_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          release_date?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          artist_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          release_date?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Albums_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "Artist";
            referencedColumns: ["id"];
          }
        ];
      };
      "Albums/Sange": {
        Row: {
          album_id: string | null;
          id: string | null;
          song_id: string | null;
          track_num: number | null;
        };
        Insert: {
          album_id?: string | null;
          id?: string | null;
          song_id?: string | null;
          track_num?: number | null;
        };
        Update: {
          album_id?: string | null;
          id?: string | null;
          song_id?: string | null;
          track_num?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "Albums/Sange_album_id_fkey";
            columns: ["album_id"];
            isOneToOne: false;
            referencedRelation: "Albums";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Albums/Sange_song_id_fkey";
            columns: ["song_id"];
            isOneToOne: false;
            referencedRelation: "Songs";
            referencedColumns: ["id"];
          }
        ];
      };
      Artist: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image: string | null;
          name: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      Songs: {
        Row: {
          artist_id: string | null;
          content: string | null;
          created_at: string;
          id: string;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          artist_id?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          artist_id?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Songs_artist_id_fkey";
            columns: ["artist_id"];
            isOneToOne: false;
            referencedRelation: "Artist";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          address: string | null;
          birthday: string | null;
          city: string | null;
          contry: string | null;
          created_at: string;
          email: string | null;
          firstName: string | null;
          gender: string | null;
          id: string;
          lastName: string | null;
          middleName: string | null;
          phone_number: string | null;
          zipcode: string | null;
        };
        Insert: {
          address?: string | null;
          birthday?: string | null;
          city?: string | null;
          contry?: string | null;
          created_at?: string;
          email?: string | null;
          firstName?: string | null;
          gender?: string | null;
          id?: string;
          lastName?: string | null;
          middleName?: string | null;
          phone_number?: string | null;
          zipcode?: string | null;
        };
        Update: {
          address?: string | null;
          birthday?: string | null;
          city?: string | null;
          contry?: string | null;
          created_at?: string;
          email?: string | null;
          firstName?: string | null;
          gender?: string | null;
          id?: string;
          lastName?: string | null;
          middleName?: string | null;
          phone_number?: string | null;
          zipcode?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
