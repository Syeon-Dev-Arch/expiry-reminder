"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const today = Date.now();

function Profile() {
  const route = useRouter();
  const [inputproduct, setInputProduct] = useState({
    name: "",
    category: "",
    expiryDate: "",
    reminderDays: 7,
  });
  const [error, setError] = useState({ success: true, text: "" });
  const [product, setProducts] = useState([]);

  const getproducts = async () => {
    try {
      const response = await axios.get("/api/products");
      return response;
    } catch (error) {
      console.log(error);
      setError({
        success: false,
        text: error.response?.data?.error || "Failed to fetch items",
      });
      return;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getproducts();
      if (data?.data?.data) {
        setProducts(data.data.data);
      }
    };
    fetchProducts();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/user/logout");
      route.push("/login");
    } catch (error) {
      console.log(error);
      setError({
        success: false,
        text: error.response?.data?.error || "Logout failed",
      });
    }
  };

  const addProduct = async () => {
    try {
      if (
        !inputproduct.name ||
        !inputproduct.category ||
        !inputproduct.reminderDays ||
        !inputproduct.expiryDate
      ) {
        setError({ success: false, text: "Please fill all the fields" });
        return;
      }
      const response = await axios.post("/api/products", inputproduct);

      setInputProduct({
        name: "",
        category: "",
        expiryDate: "",
        reminderDays: 7,
      });
      setError({ success: true, text: "" }); // Reset errors on successful add
      setProducts((prev) => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
      setError({
        success: false,
        text: error.response?.data?.error || "Failed to add item",
      });
    }
  };

  const editProduct = async (id) => {
    route.push(`/dashboard/${id}`);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      setError({
        success: false,
        text: error.response?.data?.error || "Failed to delete item",
      });
    }
  };

  // --- MINIMALIST STATISTICS CALCULATIONS ---
  // --- STATISTICS & FILTERING LOGIC ---
  const totalItems = product.length;

  // 1. Items expiring in 3 days or less (High Priority)
  const expiringSoonItems = product.filter((item) => {
    const daysLeft = Math.ceil(
      (new Date(item.expiryDate).getTime() - today) / (1000 * 60 * 60 * 24),
    );
    return daysLeft > 0 && daysLeft <= 3;
  });

  // 2. Completely expired items
  const expiredItems = product.filter((item) => {
    const daysLeft = Math.ceil(
      (new Date(item.expiryDate).getTime() - today) / (1000 * 60 * 60 * 24),
    );
    return daysLeft <= 0;
  });

  // 3. Stable items ONLY (Filter out anything expiring soon or already expired)
  const stableItems = product.filter((item) => {
    const daysLeft = Math.ceil(
      (new Date(item.expiryDate).getTime() - today) / (1000 * 60 * 60 * 24),
    );
    return daysLeft > 3;
  });

  const safeItemsCount = stableItems.length;

  return (
    <div className="min-h-screen w-full bg-white text-black antialiased px-4 md:px-8 py-6 flex flex-col gap-8">
      {/* Top Header/Navigation Area */}
      <header className="flex flex-row justify-between items-center border-b border-neutral-200 pb-4">
        <h1 className="text-xl font-bold tracking-tight">Welcome</h1>
        <Button
          variant="outline"
          className="border-neutral-200 hover:bg-neutral-100 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
          onClick={logout}
        >
          Logout
        </Button>
      </header>

      {/* Global Error Banner */}
      {!error.success && error.text && (
        <div className="p-3 bg-black text-white text-sm font-medium rounded-xl text-center tracking-wide animate-fade-in">
          {error.text}
        </div>
      )}

      {/* NEW: DASHBOARD STATISTICS SECTION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Total Tracked
          </p>
          <h3 className="text-2xl font-bold mt-1">{totalItems}</h3>
        </Card>
        <Card className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-500">
            Expiring Soon
          </p>
          <h3 className="text-2xl font-bold mt-1 text-red-600">
            {expiringSoonItems.length}
          </h3>
        </Card>
        <Card className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Expired
          </p>
          <h3 className="text-2xl font-bold mt-1 text-neutral-900">
            {expiredItems.length}
          </h3>
        </Card>
        <Card className="bg-white border border-neutral-200 p-4 rounded-xl shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Stable
          </p>
          <h3 className="text-2xl font-bold mt-1 text-green-600">
            {safeItemsCount < 0 ? 0 : safeItemsCount}
          </h3>
        </Card>
      </section>

      {/* Main Content Dashboard Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left/Middle Column: Lists Container */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* NEW: EXPIRING SOON SECTION (Conditionally rendered) */}
          {expiringSoonItems.length > 0 && (
            <section className="flex flex-col gap-4 bg-neutral-50 border border-neutral-200 p-4 rounded-2xl">
              <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Critical Action Required ({expiringSoonItems.length})
              </h2>

              <div className="flex flex-wrap gap-4">
                {expiringSoonItems.map((item) => {
                  const daysLeft = Math.ceil(
                    (new Date(item.expiryDate).getTime() - today) /
                      (1000 * 60 * 60 * 24),
                  );
                  return (
                    <Card
                      key={`soon-${item._id}`}
                      className="w-full sm:max-w-70 bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between"
                    >
                      <CardHeader className="p-4 border-b border-neutral-100 flex flex-row items-center justify-between bg-neutral-50/50">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                          {item.category || "General"}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-red-50 text-red-700 border-red-200">
                          {daysLeft}d left
                        </span>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col gap-3">
                        <div>
                          <CardTitle className="text-base font-semibold text-black truncate">
                            {item.name}
                          </CardTitle>
                          <p className="text-xs text-neutral-500 mt-1">
                            Expires: {item.expiryDate?.split("T")[0] || "N/A"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-neutral-100">
                          <Button
                            variant="outline"
                            className="text-xs py-1.5 border-neutral-200 text-neutral-700"
                            onClick={() => editProduct(item._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            className="text-xs py-1.5 border-neutral-200 text-red-700 hover:bg-red-50"
                            onClick={() => deleteProduct(item._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {/* Active Reminders List */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Active Reminders ({product.length})
            </h2>

            <div className="flex flex-wrap gap-4">
              {product.map((item) => {
                const daysLeft = Math.ceil(
                  (new Date(item.expiryDate).getTime() - today) /
                    (1000 * 60 * 60 * 24),
                );
                const alertStyle =
                  daysLeft <= 3
                    ? "bg-red-50 text-red-700 border-red-200"
                    : daysLeft <= 7
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                      : "bg-green-50 text-green-700 border-green-200";

                return (
                  <Card
                    key={item._id}
                    className="w-full sm:max-w-70 bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    <CardHeader className="p-4 border-b border-neutral-100 flex flex-row items-center justify-between bg-neutral-50/50">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                        {item.category || "General"}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border font-medium ${alertStyle}`}
                      >
                        {daysLeft > 0 ? `${daysLeft}d left` : "Expired"}
                      </span>
                    </CardHeader>

                    <CardContent className="p-4 flex flex-col gap-3">
                      <div>
                        <CardTitle className="text-base font-semibold text-black truncate">
                          {item.name}
                        </CardTitle>
                        <p className="text-xs text-neutral-500 mt-1">
                          Expires: {item.expiryDate?.split("T")[0] || "N/A"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-neutral-100">
                        <Button
                          variant="outline"
                          className="text-xs py-1.5 border-neutral-200 hover:bg-neutral-50 text-neutral-700"
                          onClick={() => editProduct(item._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className="text-xs py-1.5 border-neutral-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-neutral-700 transition-colors"
                          onClick={() => deleteProduct(item._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Dynamic Form Block */}
        <section className="lg:sticky lg:top-6 flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Create Tracker
          </h2>

          <Card className="bg-white border border-neutral-200 shadow-sm rounded-xl p-5">
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                addProduct();
              }}
            >
              {/* Product Label Field */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="p-name"
                  className="text-xs font-medium text-neutral-600"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="p-name"
                  value={inputproduct.name}
                  placeholder="e.g. Server Domain Subscription"
                  className="w-full rounded-lg border border-neutral-200 bg-white p-2.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  onChange={(e) =>
                    setInputProduct({ ...inputproduct, name: e.target.value })
                  }
                />
              </div>

              {/* Functional Category Select */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="p-select"
                  className="text-xs font-medium text-neutral-600"
                >
                  Category
                </label>
                <select
                  value={inputproduct.category}
                  id="p-select"
                  className="w-full rounded-lg border border-neutral-200 bg-white p-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none cursor-pointer"
                  onChange={(e) =>
                    setInputProduct({
                      ...inputproduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select category --</option>
                  <option value="food">Food</option>
                  <option value="medicine">Medicine</option>
                  <option value="bills">Bills</option>
                  <option value="subscriptions">Subscriptions</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Exact Calendar Date Setup */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="p-date"
                  className="text-xs font-medium text-neutral-600"
                >
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="p-date"
                  className="w-full rounded-lg border border-neutral-200 bg-white p-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all cursor-pointer"
                  value={inputproduct.expiryDate}
                  onChange={(e) =>
                    setInputProduct({
                      ...inputproduct,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>

              {/* Advance Notification Metric */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="p-reminder"
                  className="text-xs font-medium text-neutral-600"
                >
                  Early Reminder Interval (Days)
                </label>
                <input
                  type="number"
                  id="p-reminder"
                  placeholder="e.g. 5"
                  min="1"
                  className="w-full rounded-lg border border-neutral-200 bg-white p-2.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                  value={inputproduct.reminderDays}
                  onChange={(e) =>
                    setInputProduct({
                      ...inputproduct,
                      reminderDays: e.target.value,
                    })
                  }
                />
              </div>

              {/* Submit Dispatch CTA */}
              <Button
                type="submit"
                variant="default"
                className="w-full mt-2 font-medium py-2.5"
              >
                Add To Registry
              </Button>
            </form>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default Profile;
