<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends \Illuminate\Routing\Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Get all tasks for authenticated user
     */
    public function index(Request $request)
    {
        try {
            $query = Task::where('user_id', Auth::id());

            // Filter by status
            if ($request->has('status') && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            // Filter by priority
            if ($request->has('priority') && $request->priority !== 'all') {
                $query->where('priority', $request->priority);
            }

            $tasks = $query->orderBy('created_at', 'desc')->get();

            return response()->json($tasks);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch tasks',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create a new task
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'priority' => 'nullable|in:low,medium,high,urgent',
                'status' => 'nullable|in:pending,in_progress,completed,cancelled',
            ]);

            // Set defaults
            if (!isset($validated['priority'])) {
                $validated['priority'] = 'medium';
            }
            if (!isset($validated['status'])) {
                $validated['status'] = 'pending';
            }

            // Associate task with authenticated user and create
            $validated['user_id'] = Auth::id();
            $task = Task::create($validated);

            return response()->json([
                'message' => 'Task created successfully',
                'data' => $task
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get single task
     */
    public function show($id)
    {
        try {
            $task = Task::findOrFail($id);

            if ($task->user_id !== Auth::id()) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 403);
            }

            return response()->json($task);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update task
     */
    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            if ($task->user_id !== Auth::id()) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 403);
            }

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'nullable|string',
                'priority' => 'sometimes|in:low,medium,high,urgent',
                'status' => 'sometimes|in:pending,in_progress,completed,cancelled',
            ]);

            $task->update($validated);

            return response()->json([
                'message' => 'Task updated successfully',
                'data' => $task
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update task',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete task
     */
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);

            if ($task->user_id !== Auth::id()) {
                return response()->json([
                    'message' => 'Unauthorized'
                ], 403);
            }

            $task->delete();

            return response()->json([
                'message' => 'Task deleted successfully'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
