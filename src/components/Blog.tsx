import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, CalendarDays, Play } from 'lucide-react';
import { blogPosts as posts } from '@/data/portfolio';

const Blog = () => {
  const [showAllPosts, setShowAllPosts] = useState(false);

  // Initially show only 3 posts
  const displayedPosts = showAllPosts ? posts : posts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-gradient-to-b from-background to-background/95">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-accent mb-2">Latest Articles</h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            <span className="text-gradient">My Blog</span>
          </h3>
          <p className="mt-4 text-foreground/70 max-w-3xl mx-auto">
            I share my knowledge and insights about programming, development,
            and technology through my blog posts and videos.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <div
              key={post.id}
              className="glass-card rounded-xl overflow-hidden interactive-card"
            >
              {/* Post Image or Video Thumbnail */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                {post.image ? (
                  <div className="relative w-full h-full">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {post.isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary/80 rounded-full p-3">
                          <Play size={24} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                    Blog Post Image
                  </div>
                )}

                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-primary/80 hover:bg-primary text-foreground">
                  {post.category}
                </Badge>
              </div>

              {/* Post Content */}
              <div className="p-6 space-y-4">
                {/* Meta info */}
                <div className="flex items-center text-foreground/60 text-sm gap-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title and Excerpt */}
                <div>
                  <h4 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <a href={post.isVideo ? post.videoUrl : (post.blogUrl || `#blog-${post.id}`)} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </h4>
                  <p className="text-foreground/70 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="pt-2">
                  <a
                    href={post.isVideo ? post.videoUrl : (post.blogUrl || `#blog-${post.id}`)}
                    className="text-accent hover:text-accent/80 flex items-center gap-1 transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.isVideo ? "Watch Video" : "Read More"}
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Posts Button */}
        {!showAllPosts && posts.length > 3 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="neon-border gap-2"
              onClick={() => setShowAllPosts(true)}
            >
              View All Posts
              <ArrowRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
