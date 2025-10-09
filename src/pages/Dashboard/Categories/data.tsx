import {
  BookOpen,
  Calendar,
  FileText,
  Layers,
  Package,
  Tag,
  Users,
} from "lucide-react";

export const categories = [
  { id: "section", name: "Section", icon: FileText, color: "bg-blue-500" },
  { id: "examType", name: "Exam Type", icon: BookOpen, color: "bg-purple-500" },
  {
    id: "examSubType",
    name: "Exam Sub-Type",
    icon: Layers,
    color: "bg-indigo-500",
  },
  { id: "year", name: "Year", icon: Calendar, color: "bg-green-500" },
  { id: "group", name: "Group", icon: Users, color: "bg-orange-500" },
  { id: "level", name: "Level", icon: Layers, color: "bg-cyan-500" },
  { id: "subject", name: "Subject", icon: BookOpen, color: "bg-pink-500" },
  { id: "lesson", name: "Lesson", icon: FileText, color: "bg-red-500" },
  { id: "topics", name: "Topics", icon: Tag, color: "bg-yellow-500" },
  { id: "subTopics", name: "Sub Topics", icon: Tag, color: "bg-teal-500" },
  { id: "tags", name: "Tags", icon: Tag, color: "bg-violet-500" },
  {
    id: "additionalPackage",
    name: "Additional Package",
    icon: Package,
    color: "bg-emerald-500",
  },
];
