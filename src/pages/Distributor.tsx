import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { db } from "@/lib/db";

const distributorSchema = z.object({
  farmerName: z.string().min(2, "Farmer name is required"),
  quantity: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, "Enter a valid quantity"),
  fertilizerAmount: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, "Enter a valid amount"),
  address: z.string().min(5, "Address is required"),
  pincode: z
    .string()
    .regex(/^\d{5,6}$/,
      "Enter a valid 5-6 digit postal code"),
});

type DistributorFormValues = z.infer<typeof distributorSchema>;

const defaultValues: DistributorFormValues = {
  farmerName: "",
  quantity: "",
  fertilizerAmount: "",
  address: "",
  pincode: "",
};

const Distributor = () => {
  const { toast } = useToast();

  const form = useForm<DistributorFormValues>({
    resolver: zodResolver(distributorSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = (values: DistributorFormValues) => {
    const summary = {
      farmerName: values.farmerName,
      quantity: Number(values.quantity),
      fertilizerAmount: Number(values.fertilizerAmount),
      address: values.address,
      pincode: values.pincode,
    };

    toast({
      title: "Distributor entry recorded",
      description: `Farmer: ${summary.farmerName} • Qty: ${summary.quantity} • Fertilizer: ${summary.fertilizerAmount} • PIN: ${summary.pincode}`,
    });
    // Persist to IndexedDB
    db.farmers.add({
      name: summary.farmerName,
      quantity: summary.quantity,
      fertilizerAmount: summary.fertilizerAmount,
      address: summary.address,
      pincode: summary.pincode,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Distributor</CardTitle>
            <CardDescription>
              Record farmer details and fertilizer distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Link to="/distributor/network" className="text-sm underline text-primary">
                View Retailers & Farmers
              </Link>
            </div>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="farmerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ramesh Kumar" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="e.g., 500 (kg)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fertilizerAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fertilizer Amount</FormLabel>
                        <FormControl>
                          <Input inputMode="numeric" placeholder="e.g., 50 (kg)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="House, Street, Village/Town, District, State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code (PIN)</FormLabel>
                      <FormControl>
                        <Input inputMode="numeric" placeholder="e.g., 751001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-3">
                  <Button type="submit" variant="blockchain">Save Entry</Button>
                  <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Distributor;

