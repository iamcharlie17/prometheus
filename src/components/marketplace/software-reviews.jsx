import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

const mockReviews = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    rating: 5,
    title: "Excellent development tool!",
    content:
      "This has completely transformed my development workflow. The AI assistance is incredibly helpful and the collaboration features are top-notch.",
    date: "2024-02-15",
    helpful: 12,
    verified: true,
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    rating: 4,
    title: "Great features, minor learning curve",
    content:
      "Really powerful tool with lots of features. Took a bit of time to learn all the shortcuts and features, but worth it once you get the hang of it.",
    date: "2024-02-10",
    helpful: 8,
    verified: true,
  },
  {
    id: "3",
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    rating: 5,
    title: "Perfect for team collaboration",
    content:
      "Our entire team switched to this and productivity has increased significantly. The real-time collaboration features are game-changing.",
    date: "2024-02-05",
    helpful: 15,
    verified: true,
  },
];

export function SoftwareReviews() {
  const averageRating = 4.8;
  const totalReviews = 124;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Reviews & Ratings
          </CardTitle>
          <Button variant="outline" size="sm">
            Write Review
          </Button>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= averageRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold">{averageRating}</span>
          </div>
          <div className="text-muted-foreground">
            Based on {totalReviews} reviews
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="space-y-3 pb-6 border-b border-border last:border-0"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={review.user.avatar || "/placeholder.svg"}
                  alt={review.user.name}
                />
                <AvatarFallback>{review.user.initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.user.name}</span>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <h4 className="font-medium">{review.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review.content}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="w-3 h-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </CardContent>
    </Card>
  );
}
