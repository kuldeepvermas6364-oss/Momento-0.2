-- ============================================================
-- Momento - Database Schema (Phase 1: Authentication + Foundation)
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE
-- Maps to auth.users - stores public user data
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text not null,
  avatar_url text,
  bio text default '',
  verified boolean default false,
  website text,
  followers_count integer default 0,
  following_count integer default 0,
  posts_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- ============================================================
-- 2. POSTS TABLE
-- ============================================================
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  caption text default '',
  image_url text,
  video_url text,
  likes_count integer default 0,
  comments_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.posts enable row level security;

create policy "Posts are viewable by everyone"
  on public.posts for select using (true);

create policy "Users can create posts"
  on public.posts for insert with check (auth.uid() = author_id);

create policy "Users can update own posts"
  on public.posts for update using (auth.uid() = author_id);

create policy "Users can delete own posts"
  on public.posts for delete using (auth.uid() = author_id);

-- ============================================================
-- 3. COMMENTS TABLE
-- ============================================================
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone"
  on public.comments for select using (true);

create policy "Users can create comments"
  on public.comments for insert with check (auth.uid() = author_id);

create policy "Users can delete own comments"
  on public.comments for delete using (auth.uid() = author_id);

-- ============================================================
-- 4. LIKES TABLE
-- ============================================================
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

alter table public.likes enable row level security;

create policy "Likes are viewable by everyone"
  on public.likes for select using (true);

create policy "Users can like posts"
  on public.likes for insert with check (auth.uid() = user_id);

create policy "Users can unlike posts"
  on public.likes for delete using (auth.uid() = user_id);

-- ============================================================
-- 5. SAVED POSTS TABLE
-- ============================================================
create table if not exists public.saved_posts (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(post_id, user_id)
);

alter table public.saved_posts enable row level security;

create policy "Users can view own saved posts"
  on public.saved_posts for select using (auth.uid() = user_id);

create policy "Users can save posts"
  on public.saved_posts for insert with check (auth.uid() = user_id);

create policy "Users can unsave posts"
  on public.saved_posts for delete using (auth.uid() = user_id);

-- ============================================================
-- 6. FOLLOWS TABLE
-- ============================================================
create table if not exists public.follows (
  id uuid primary key default gen_random_uuid(),
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  unique(follower_id, following_id),
  check (follower_id != following_id)
);

alter table public.follows enable row level security;

create policy "Follows are viewable by everyone"
  on public.follows for select using (true);

create policy "Users can follow others"
  on public.follows for insert with check (auth.uid() = follower_id);

create policy "Users can unfollow others"
  on public.follows for delete using (auth.uid() = follower_id);

-- ============================================================
-- 7. STORIES TABLE
-- ============================================================
create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  media_url text not null,
  media_type text default 'image' check (media_type in ('image', 'video')),
  created_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '24 hours')
);

alter table public.stories enable row level security;

create policy "Stories are viewable by everyone"
  on public.stories for select using (true);

create policy "Users can create stories"
  on public.stories for insert with check (auth.uid() = author_id);

create policy "Users can delete own stories"
  on public.stories for delete using (auth.uid() = author_id);

-- ============================================================
-- 8. STORY VIEWS TABLE
-- ============================================================
create table if not exists public.story_views (
  id uuid primary key default gen_random_uuid(),
  story_id uuid not null references public.stories(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  viewed_at timestamptz default now(),
  unique(story_id, user_id)
);

alter table public.story_views enable row level security;

create policy "Users can view story views"
  on public.story_views for select using (true);

create policy "Users can record story views"
  on public.story_views for insert with check (auth.uid() = user_id);

-- ============================================================
-- 9. NOTIFICATIONS TABLE
-- ============================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  actor_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('like', 'comment', 'follow', 'mention')),
  text text not null,
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update using (auth.uid() = user_id);

-- ============================================================
-- 10. MESSAGES TABLE
-- ============================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  receiver_id uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  image_url text,
  read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Users can view own messages"
  on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on public.messages for insert with check (auth.uid() = sender_id);

create policy "Users can update own messages"
  on public.messages for update using (auth.uid() = receiver_id);

-- ============================================================
-- 11. REELS TABLE
-- ============================================================
create table if not exists public.reels (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  video_url text not null,
  caption text default '',
  audio_name text,
  likes_count integer default 0,
  comments_count integer default 0,
  shares_count integer default 0,
  created_at timestamptz default now()
);

alter table public.reels enable row level security;

create policy "Reels are viewable by everyone"
  on public.reels for select using (true);

create policy "Users can create reels"
  on public.reels for insert with check (auth.uid() = author_id);

create policy "Users can delete own reels"
  on public.reels for delete using (auth.uid() = author_id);

-- ============================================================
-- 12. HASHTAGS TABLE
-- ============================================================
create table if not exists public.hashtags (
  id uuid primary key default gen_random_uuid(),
  tag text unique not null,
  posts_count integer default 0,
  created_at timestamptz default now()
);

alter table public.hashtags enable row level security;

create policy "Hashtags are viewable by everyone"
  on public.hashtags for select using (true);

create policy "Users can create hashtags"
  on public.hashtags for insert with check (auth.uid() is not null);

-- ============================================================
-- TRIGGERS: Auto-update counter fields
-- ============================================================

create or replace function increment_likes_count()
returns trigger as $$
begin
  update public.posts set likes_count = likes_count + 1 where id = new.post_id;
  return new;
end;
$$ language plpgsql;

create or replace function decrement_likes_count()
returns trigger as $$
begin
  update public.posts set likes_count = likes_count - 1 where id = old.post_id;
  return old;
end;
$$ language plpgsql;

create trigger on_like_inserted
  after insert on public.likes
  for each row execute function increment_likes_count();

create trigger on_like_deleted
  after delete on public.likes
  for each row execute function decrement_likes_count();

create or replace function increment_comments_count()
returns trigger as $$
begin
  update public.posts set comments_count = comments_count + 1 where id = new.post_id;
  return new;
end;
$$ language plpgsql;

create or replace function decrement_comments_count()
returns trigger as $$
begin
  update public.posts set comments_count = comments_count - 1 where id = old.post_id;
  return old;
end;
$$ language plpgsql;

create trigger on_comment_inserted
  after insert on public.comments
  for each row execute function increment_comments_count();

create trigger on_comment_deleted
  after delete on public.comments
  for each row execute function decrement_comments_count();

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profile_update
  before update on public.profiles
  for each row execute function update_updated_at();

create trigger on_post_update
  before update on public.posts
  for each row execute function update_updated_at();

-- ============================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================
create or replace function handle_new_user()
returns trigger as $$
declare
  full_name text;
  username_base text;
  random_suffix text;
begin
  full_name := coalesce(new.raw_user_meta_data->>'full_name', 'user');
  username_base := lower(regexp_replace(full_name, '[^a-zA-Z0-9]', '', 'g'));
  random_suffix := floor(random() * 10000)::text;

  insert into public.profiles (id, username, name)
  values (new.id, username_base || random_suffix, full_name);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('posts', 'posts', true),
  ('stories', 'stories', true),
  ('reels', 'reels', true),
  ('messages', 'messages', false)
on conflict (id) do nothing;

-- Storage policies: avatars
create policy "Avatar images are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid() = owner);

create policy "Users can update their own avatar"
  on storage.objects for update using (bucket_id = 'avatars' and auth.uid() = owner);

-- Storage policies: posts
create policy "Post images are publicly accessible"
  on storage.objects for select using (bucket_id = 'posts');

create policy "Users can upload post images"
  on storage.objects for insert with check (bucket_id = 'posts' and auth.uid() = owner);

create policy "Users can delete own post images"
  on storage.objects for delete using (bucket_id = 'posts' and auth.uid() = owner);

-- Storage policies: stories
create policy "Story images are publicly accessible"
  on storage.objects for select using (bucket_id = 'stories');

create policy "Users can upload story images"
  on storage.objects for insert with check (bucket_id = 'stories' and auth.uid() = owner);

create policy "Users can delete own stories"
  on storage.objects for delete using (bucket_id = 'stories' and auth.uid() = owner);

-- Storage policies: reels
create policy "Reel videos are publicly accessible"
  on storage.objects for select using (bucket_id = 'reels');

create policy "Users can upload reel videos"
  on storage.objects for insert with check (bucket_id = 'reels' and auth.uid() = owner);

create policy "Users can delete own reels"
  on storage.objects for delete using (bucket_id = 'reels' and auth.uid() = owner);

-- Storage policies: messages (private)
create policy "Users can view own message images"
  on storage.objects for select using (bucket_id = 'messages' and (auth.uid() = owner));

create policy "Users can upload message images"
  on storage.objects for insert with check (bucket_id = 'messages' and auth.uid() = owner);

-- ============================================================
-- DONE - Phase 1 Database Schema Complete
-- ============================================================
