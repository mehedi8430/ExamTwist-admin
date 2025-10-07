/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [items, setItems] = useState(generateMockData(CATEGORIES[0].id));
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formValue, setFormValue] = useState("");

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    setItems(generateMockData(category.id));
    setSearchTerm("");
  };

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
    <section className="">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold  mb-2">Categories Management</h1>
          <p className="text-sm">
            Manage all your educational categories in one place
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Category List */}
          <div className="lg:col-span-1  rounded-xl p-4 border-2 border-border">
            <div className="max-h-[64vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4 px-2">Categories</h2>
              <div className="space-y-1">
                {CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory.id === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                        isSelected ? "bg-primary/80 " : "hover:bg-primary/80"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg ${isSelected ? "bg-primary/80" : "bg-white/10 hover:bg-primary/80"}`}
                      >
                        <Icon className={`size-4`} />
                      </div>
                      <span className="font-medium text-sm">
                        {category.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border-2 border-border">
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

              {/* Items List */}
              <div className="p-6">
                {filteredItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                      <IconComponent className="w-8 h-8 " />
                    </div>
                    <h3 className="text-lg font-medium  mb-1">
                      No items found
                    </h3>
                    <p className="">
                      {searchTerm
                        ? "Try adjusting your search"
                        : `Add your first ${selectedCategory.name.toLowerCase()} to get started`}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.map((item: any) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between p-4 rounded-lg transition-all duration-200 border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold`}
                          >
                            {item.id}
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openModal(item)}
                            className="p-2 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer Stats */}
              <div className="px-6 py-4  border-t ">
                <p className="text-sm">
                  Total: <span className="font-semibold">{items.length}</span>{" "}
                  {selectedCategory.name.toLowerCase()}
                  {searchTerm && (
                    <span>
                      {" "}
                      • Showing:{" "}
                      <span className="font-semibold">
                        {filteredItems.length}
                      </span>{" "}
                      results
                    </span>
                  )}
                </p>
              </div>
            </div>
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
