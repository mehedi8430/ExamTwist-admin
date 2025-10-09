/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  FileText,
  BookOpen,
  Users,
  Calendar,
  Layers,
  Tag,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

const CATEGORIES = [
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

// Mock data for demonstration
const generateMockData = (categoryId: string) => {
  const items: any = {
    section: ["Science", "Commerce", "Arts", "Engineering"],
    examType: ["SSC", "HSC", "University Admission", "Job Preparation"],
    examSubType: ["Written", "MCQ", "Practical", "Viva"],
    year: ["2024", "2023", "2022", "2021"],
    group: ["Group A", "Group B", "Group C"],
    level: ["Beginner", "Intermediate", "Advanced"],
    subject: ["Mathematics", "Physics", "Chemistry", "Biology"],
    lesson: ["Lesson 1", "Lesson 2", "Lesson 3"],
    topics: ["Algebra", "Geometry", "Calculus"],
    subTopics: ["Linear Equations", "Quadratic Equations"],
    tags: ["Important", "Difficult", "Easy"],
    additionalPackage: ["Premium", "Basic", "Standard"],
  };
  return (
    items[categoryId]?.map((name: string, idx: number) => ({
      id: idx + 1,
      name,
    })) || []
  );
};

export default function CategoriesPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0],
  );
  const [items, setItems] = useState(generateMockData(selectedCategory.id));
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const currentCategory =
      CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
    setSelectedCategory(currentCategory);
    setItems(generateMockData(currentCategory.id));
    setSearchTerm("");
  }, [categoryId]);

  const filteredItems = items.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormValue(item ? item.name : "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormValue("");
  };

  const handleSave = () => {
    if (!formValue.trim()) return;

    if (editingItem) {
      setItems(
        items.map((item: any) =>
          item.id === editingItem.id ? { ...item, name: formValue } : item,
        ),
      );
    } else {
      const newItem = { id: items.length + 1, name: formValue };
      setItems([...items, newItem]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item: any) => item.id !== id));
    }
  };

  const IconComponent = selectedCategory.icon;

  return (
    <section className="w-full">
      <div className="lg:col-span-3">
        <div className="rounded-xl bg-primary/10">
          {/* Category Header */}
          <div className={`p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <IconComponent className="size-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-sm mt-1">
                    Manage {selectedCategory.name.toLowerCase()} entries
                  </p>
                </div>
              </div>
              <Button
                onClick={() => openModal()}
                variant={"outline"}
                className="!border-border"
              >
                <Plus className="w-4 h-4" />
                Add New
              </Button>
            </div>
          </div>

          {/* Category Body */}
          <div className="p-6">
            <h1>Categories</h1>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Modal Header */}
            <div
              className={`${selectedCategory.color} p-6 rounded-t-xl text-white`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {editingItem ? "Edit" : "Add New"} {selectedCategory.name}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedCategory.name} Name
              </label>
              <input
                type="text"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder={`Enter ${selectedCategory.name.toLowerCase()} name`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                autoFocus
                onKeyPress={(e) => e.key === "Enter" && handleSave()}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-xl">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formValue.trim()}
                className={`flex items-center gap-2 px-4 py-2.5 ${selectedCategory.color} text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Save className="w-4 h-4" />
                {editingItem ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
